const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'archive.db');
const db = new Database(dbPath);

// Initialize Database Schema
function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS archive_records (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      date TEXT,
      creator TEXT,
      language TEXT,
      description TEXT,
      content TEXT,
      source TEXT,
      sourceUrl TEXT,
      tags TEXT,
      provenance TEXT,
      ingestedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS archive_fts USING fts5(
      id UNINDEXED,
      title,
      content,
      description,
      creator,
      tags
    );

    CREATE TABLE IF NOT EXISTS api_cache (
      key TEXT PRIMARY KEY,
      data TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert seed data if empty
  const count = db.prepare('SELECT COUNT(*) as count FROM archive_records').get().count;
  
  if (count === 0) {
    console.log("Database empty. Seeding initial primary records...");
    
    const insertRecord = db.prepare(`
      INSERT INTO archive_records (id, title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance)
      VALUES (@id, @title, @type, @date, @creator, @language, @description, @content, @source, @sourceUrl, @tags, @provenance)
    `);

    const insertFts = db.prepare(`
      INSERT INTO archive_fts (id, title, content, description, creator, tags)
      VALUES (@id, @title, @content, @description, @creator, @tags)
    `);

    const seedData = [
      {
        id: "rec-001",
        title: "Annihilation of Caste",
        type: "book",
        date: "1936-05-15",
        creator: "Dr. B.R. Ambedkar",
        language: "English",
        description: "An undelivered speech written in 1936 by B. R. Ambedkar. It is considered a seminal text in the Dalit movement.",
        content: "There is no doubt, in my opinion, that unless you change your social order you can achieve little by way of progress. You cannot mobilize the community either for defence or for offence. You cannot build anything on the foundations of caste. You cannot build up a nation, you cannot build up a morality. Anything that you will build on the foundations of caste will crack and will never be a whole.",
        source: "Dr. Ambedkar Foundation / Government of India",
        sourceUrl: "http://ambedkarfoundation.nic.in/",
        tags: "social reform, caste, equality, morality",
        provenance: "Digitized from original 1936 print edition. PRIMARY OFFICIAL"
      },
      {
        id: "rec-002",
        title: "Speech on Adoption of the Constitution",
        type: "debate",
        date: "1949-11-25",
        creator: "Dr. B.R. Ambedkar",
        language: "English",
        description: "Final speech at the Constituent Assembly before the adoption of the Constitution of India.",
        content: "Political democracy cannot last unless there lies at the base of it social democracy. What does social democracy mean? It means a way of life which recognizes liberty, equality and fraternity as the principles of life.",
        source: "Constituent Assembly Debates Vol XI",
        sourceUrl: "https://www.constitutionofindia.net/",
        tags: "constitution, democracy, equality, fraternity",
        provenance: "Parliamentary Archives of India. PRIMARY / DIGITIZED SOURCE"
      },
      {
        id: "rec-003",
        title: "Mahad Satyagraha Declaration",
        type: "event",
        date: "1927-03-20",
        creator: "Dr. B.R. Ambedkar",
        language: "Marathi / English",
        description: "Led a satyagraha in Mahad to fight for the right of the untouchable community to draw water from the main water tank.",
        content: "We are going to the tank to assert our right to water. It is not that drinking the water from this tank will make us immortal. We are going there to establish the fact that we are human beings just like others.",
        source: "Historical Press Records",
        sourceUrl: "",
        tags: "satyagraha, water rights, human rights, social movement",
        provenance: "Verified historical press clipping, digitized. SECONDARY INSTITUTIONAL"
      },
      {
        id: "rec-004",
        title: "Drafting Committee Discussion on Article 10 (Equality of Opportunity)",
        type: "debate",
        date: "1948-11-30",
        creator: "Dr. B.R. Ambedkar",
        language: "English",
        description: "Discussion on Article 10 (which became Article 16) regarding equality of opportunity in public employment.",
        content: "We have to safeguard two things namely, the principle of equality of opportunity and at the same time satisfy the demand of communities which have not had so far representation in the State. The draft article seems to me to strike a balance between these two points of view.",
        source: "Constituent Assembly Debates",
        sourceUrl: "https://www.constitutionofindia.net/",
        tags: "constitution, article 10, equality of opportunity, reservations",
        provenance: "Parliamentary Archives of India. PRIMARY / DIGITIZED SOURCE"
      }
    ];

    const insertMany = db.transaction((records) => {
      for (const record of records) {
        insertRecord.run(record);
        insertFts.run(record);
      }
    });

    insertMany(seedData);
    console.log("Database seeded successfully.");
  }
}

initDb();

module.exports = db;
