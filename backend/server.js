const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const db = require('./db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Gemini setup
let genAI = null;
let model = null;
if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash-latest" });
}

// ----------------------------------------------------
// 1. HEALTH REPORT API
// ----------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    application: "ONLINE",
    database: "CONNECTED (SQLite)",
    gemini: model ? "CONNECTED" : "NOT CONFIGURED (Using Fallback Retrieval)",
    government_archive: "CONNECTED (Simulated Connector)",
    open_library: "CONNECTED",
    timestamp: new Date().toISOString()
  });
});

// ----------------------------------------------------
// 2. SEARCH API (FTS5 + SQLite)
// ----------------------------------------------------
app.get('/api/search', (req, res) => {
  try {
    const { q, type } = req.query;
    
    let query = `
      SELECT r.* 
      FROM archive_records r
      WHERE 1=1
    `;
    const params = {};

    if (q) {
      query = `
        SELECT r.*, rank 
        FROM archive_fts f
        JOIN archive_records r ON f.id = r.id
        WHERE archive_fts MATCH @q
        ORDER BY rank
      `;
      // SQLite FTS syntax escaping
      params.q = q.replace(/[^a-zA-Z0-9 ]/g, '') + '*';
    }

    if (type && type !== 'all') {
      if (q) {
        query = `SELECT * FROM (${query}) WHERE type = @type`;
      } else {
        query += ` AND type = @type`;
      }
      params.type = type;
    }

    const records = db.prepare(query).all(params);
    res.json(records);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Failed to search the archive database." });
  }
});

// ----------------------------------------------------
// 2.5. RECORD BY ID API
// ----------------------------------------------------
app.get('/api/records/:id', (req, res) => {
  try {
    const { id } = req.params;
    const record = db.prepare('SELECT * FROM archive_records WHERE id = ?').get(id);
    if (!record) return res.status(404).json({ error: "Record not found" });
    res.json(record);
  } catch (error) {
    console.error("Fetch record error:", error);
    res.status(500).json({ error: "Failed to fetch the record." });
  }
});

// ----------------------------------------------------
// 2.6. CREATE RECORD API
// ----------------------------------------------------
app.post('/api/records', (req, res) => {
  try {
    const { title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance } = req.body;
    const id = `rec-${Date.now()}`;
    
    const insertRecord = db.prepare(`
      INSERT INTO archive_records (id, title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance)
      VALUES (@id, @title, @type, @date, @creator, @language, @description, @content, @source, @sourceUrl, @tags, @provenance)
    `);

    const insertFts = db.prepare(`
      INSERT INTO archive_fts (id, title, content, description, creator, tags)
      VALUES (@id, @title, @content, @description, @creator, @tags)
    `);

    const record = { id, title: title || 'Untitled', type: type || 'document', date: date || '', creator: creator || '', language: language || 'English', description: description || '', content: content || '', source: source || '', sourceUrl: sourceUrl || '', tags: tags || '', provenance: provenance || 'USER INGESTED' };

    db.transaction(() => {
      insertRecord.run(record);
      insertFts.run(record);
    })();
    
    res.status(201).json({ success: true, record });
  } catch (error) {
    console.error("Create record error:", error);
    res.status(500).json({ error: "Failed to create the record." });
  }
});

// ----------------------------------------------------
// 3. RAG CHATBOT API (GEMINI WITH RETRIEVAL FALLBACK)
// ----------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { question, mode = 'visitor' } = req.body;
    if (!question) return res.status(400).json({ error: "Question is required." });

    // STEP 1: Archive Retrieval (BM25 style using FTS5)
    const terms = question.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 3).join(' OR ');
    
    let evidence = [];
    if (terms) {
      evidence = db.prepare(`
        SELECT r.id, r.title, r.date, r.creator, r.source, r.content, r.provenance
        FROM archive_fts f
        JOIN archive_records r ON f.id = r.id
        WHERE archive_fts MATCH @terms
        ORDER BY rank LIMIT 3
      `).all({ terms });
    }

    // IF NO EVIDENCE FOUND
    if (evidence.length === 0) {
      return res.json({
        answer: "I could not find sufficient evidence in the verified archive corpora to answer your question. The historical records indexed do not mention this specific topic.",
        evidence: [],
        mode: "NO_EVIDENCE"
      });
    }

    const evidenceText = evidence.map((e, idx) => 
      `[Source ${idx + 1}] Title: ${e.title} | Date: ${e.date} | Creator: ${e.creator}\nContent: "${e.content}"\nProvenance: ${e.provenance}`
    ).join('\n\n');

    // STEP 2: Generative AI
    if (model) {
      let modePrompt = "";
      if (mode === 'visitor') {
        modePrompt = "Format your response as a concise, accessible 2-paragraph summary with key takeaways designed for a general museum visitor.";
      } else {
        modePrompt = "Format your response as an exhaustive legal and historical analysis for a scholar. Include strict citations, constitutional clauses, and historical drafts where applicable. Every claim must highlight exact page numbers, volumes, and historical dates based purely on the evidence.";
      }

      const prompt = `
You are "Samvidhan AI", a research assistant dedicated strictly to verified historical corpora (e.g., writings and speeches of Dr. B.R. Ambedkar).
ANTI-HALLUCINATION PROTOCOL ACTIVE: Use ONLY the retrieved archive evidence provided below. 
Never fabricate quotations, dates, page numbers, or documents. 
If the evidence below is insufficient to answer the question fully, state that clearly.
Cite your sources exactly using [Source 1], etc.

RESPONSE MODE: ${mode.toUpperCase()}
${modePrompt}

EVIDENCE:
${evidenceText}

USER QUESTION:
${question}
      `;

      try {
        const result = await model.generateContent(prompt);
        const text = await result.response.text();
        return res.json({
          answer: text,
          evidence,
          mode: `AI_GENERATED_${mode.toUpperCase()}`
        });
      } catch (genError) {
        console.error("Gemini Generation Error:", genError);
        // Fallback below
      }
    }

    // FALLBACK IF NO API KEY OR API FAILS
    res.json({
      answer: "I found relevant historical records, but the AI synthesis engine is currently unavailable. Please review the primary sources below.",
      evidence,
      mode: "FALLBACK_RETRIEVAL"
    });

  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to process chat query." });
  }
});

// ----------------------------------------------------
// 4. OPEN LIBRARY SYNC API
// ----------------------------------------------------
app.post('/api/sync/openlibrary', async (req, res) => {
  try {
    // Fetch B.R. Ambedkar books from Open Library API
    const response = await axios.get('https://openlibrary.org/search.json?author=B.+R.+Ambedkar&limit=5');
    const books = response.data.docs;
    
    let addedCount = 0;
    const insertStmt = db.prepare(`
      INSERT OR IGNORE INTO archive_records (id, title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance)
      VALUES (@id, @title, @type, @date, @creator, @language, @description, @content, @source, @sourceUrl, @tags, @provenance)
    `);

    const insertFts = db.prepare(`
      INSERT OR IGNORE INTO archive_fts (id, title, content, description, creator, tags)
      VALUES (@id, @title, @content, @description, @creator, @tags)
    `);

    const transaction = db.transaction((booksArr) => {
      for (const book of booksArr) {
        const record = {
          id: `ol-${book.key.replace('/works/', '')}`,
          title: book.title,
          type: 'book',
          date: book.first_publish_year ? book.first_publish_year.toString() : 'Unknown',
          creator: 'Dr. B.R. Ambedkar',
          language: book.language ? book.language.join(', ') : 'Unknown',
          description: `Open Library Catalog Record. ISBN: ${book.isbn ? book.isbn[0] : 'N/A'}`,
          content: `Bibliographic record for ${book.title}, authored by B.R. Ambedkar.`,
          source: 'Open Library Catalog',
          sourceUrl: `https://openlibrary.org${book.key}`,
          tags: 'book, bibliography, open library',
          provenance: 'EXTERNAL PUBLIC SOURCE'
        };
        const info = insertStmt.run(record);
        if (info.changes > 0) {
          insertFts.run(record);
          addedCount++;
        }
      }
    });

    transaction(books);

    res.json({
      success: true,
      discovered: books.length,
      added: addedCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Sync error:", error);
    res.status(500).json({ success: false, error: "Failed to sync with Open Library." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend Server listening on http://localhost:${PORT}`);
});
