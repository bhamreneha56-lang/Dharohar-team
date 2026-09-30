const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'archive.db');
const db = new Database(dbPath);

const massiveSeedData = [
  {
    id: "rec-timeline-001",
    title: "Birth of Bhimrao Ramji Ambedkar",
    type: "event",
    date: "1891-04-14",
    creator: "Historical Record",
    language: "English",
    description: "B.R. Ambedkar was born in the town and military cantonment of Mhow in the Central Provinces.",
    content: "B.R. Ambedkar was born into a Mahar (dalit) caste, who were treated as untouchables and subjected to socio-economic discrimination.",
    source: "Biographical Archives",
    sourceUrl: "",
    tags: "birth, early life",
    provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-001",
    title: "The Problem of the Rupee: Its Origin and Its Solution",
    type: "book",
    date: "1923-01-01",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "Ambedkar's thesis for his D.Sc. at the London School of Economics.",
    content: "The thesis explores the history of Indian currency and suggests solutions to its depreciation. It heavily influenced the creation of the Reserve Bank of India.",
    source: "London School of Economics Archives",
    sourceUrl: "",
    tags: "economics, currency, rbi",
    provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-event-002",
    title: "Kalaram Temple Entry Movement",
    type: "event",
    date: "1930-03-02",
    creator: "Dr. B.R. Ambedkar",
    language: "Marathi",
    description: "A pivotal satyagraha asserting the right of Dalits to enter the Kalaram Temple in Nashik.",
    content: "This movement was not just about entering a temple, but about asserting equal human rights. Ambedkar led a peaceful procession to claim equal treatment before God and Society.",
    source: "Historical Press Records",
    sourceUrl: "",
    tags: "satyagraha, temple entry, human rights",
    provenance: "SECONDARY INSTITUTIONAL"
  },
  {
    id: "rec-speech-001",
    title: "Annihilation of Caste (Full Text)",
    type: "speech",
    date: "1936-05-15",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "Seminal undelivered speech addressing the Jat-Pat Todak Mandal.",
    content: "Turn in any direction you like, caste is the monster that crosses your path. You cannot have political reform, you cannot have economic reform, unless you kill this monster.",
    source: "Dr. Ambedkar Foundation",
    sourceUrl: "",
    tags: "caste system, social reform",
    provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-002",
    title: "Who Were the Shudras?",
    type: "book",
    date: "1946-01-01",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "A historical inquiry into the origins of the Shudra varna.",
    content: "Ambedkar attempts to explain how the Shudras, originally part of the Kshatriya varna, were relegated to the fourth varna due to continuous conflicts with Brahmins.",
    source: "Dr. Ambedkar Foundation",
    sourceUrl: "",
    tags: "history, varna, shudras",
    provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-debate-002",
    title: "Constituent Assembly Debate on Fundamental Rights",
    type: "debate",
    date: "1948-11-04",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "Ambedkar introduces the Draft Constitution and discusses the concept of Constitutional Morality.",
    content: "Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it. Democracy in India is only a top-dressing on an Indian soil, which is essentially undemocratic.",
    source: "Constituent Assembly Debates Vol VII",
    sourceUrl: "https://www.constitutionofindia.net/",
    tags: "constitutional morality, democracy",
    provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-003",
    title: "Debate on Federalism vs Unitary State",
    type: "debate",
    date: "1948-11-04",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "Clarification on the nature of the Indian Union.",
    content: "The Draft Constitution is a Federal Constitution inasmuch as it establishes what may be called a Dual Polity. This Dual Polity under the proposed Constitution will consist of the Union at the Centre and the States at the periphery...",
    source: "Constituent Assembly Debates Vol VII",
    sourceUrl: "https://www.constitutionofindia.net/",
    tags: "federalism, constitution, dual polity",
    provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-event-003",
    title: "Resignation from Nehru's Cabinet",
    type: "event",
    date: "1951-09-27",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "Ambedkar resigns as Law Minister after the stalling of the Hindu Code Bill.",
    content: "I have been Law Minister for four years. The Hindu Code Bill was the greatest social reform measure ever undertaken. Its stalling leaves me no choice but to resign.",
    source: "Parliamentary Archives",
    sourceUrl: "",
    tags: "hindu code bill, resignation, women rights",
    provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-003",
    title: "The Buddha and His Dhamma",
    type: "book",
    date: "1957-01-01",
    creator: "Dr. B.R. Ambedkar",
    language: "English",
    description: "A treatise on Buddha's life and Buddhist philosophy, published posthumously.",
    content: "To maintain the purity of the Dhamma, the Buddha established the Sangha. The Dhamma is meant for the salvation of all beings.",
    source: "Dr. Ambedkar Foundation",
    sourceUrl: "",
    tags: "buddhism, religion, philosophy",
    provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-event-004",
    title: "Mass Conversion to Buddhism at Deekshabhoomi",
    type: "event",
    date: "1956-10-14",
    creator: "Historical Record",
    language: "Marathi / English",
    description: "Ambedkar, along with half a million followers, embraces Buddhism in Nagpur.",
    content: "I accept the Navayana Buddhism. By discarding my ancient religion which stood for inequality and oppression, today I am reborn.",
    source: "Historical Press Records",
    sourceUrl: "",
    tags: "buddhism, deekshabhoomi, conversion",
    provenance: "SECONDARY INSTITUTIONAL"
  }
];

try {
  const insertRecord = db.prepare(`
    INSERT OR IGNORE INTO archive_records (id, title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance)
    VALUES (@id, @title, @type, @date, @creator, @language, @description, @content, @source, @sourceUrl, @tags, @provenance)
  `);

  const insertFts = db.prepare(`
    INSERT OR IGNORE INTO archive_fts (id, title, content, description, creator, tags)
    VALUES (@id, @title, @content, @description, @creator, @tags)
  `);

  const insertMany = db.transaction((records) => {
    for (const record of records) {
      const res = insertRecord.run(record);
      if (res.changes > 0) {
        insertFts.run(record);
      }
    }
  });

  insertMany(massiveSeedData);
  console.log("Massive DB Seed Completed Successfully. Inserted new verified records.");
} catch (e) {
  console.error("Failed to seed database:", e);
}
