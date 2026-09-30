const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'archive.db');
const db = new Database(dbPath);

const massiveSeedData = [
  // --- TIMELINE EVENTS ---
  {
    id: "rec-timeline-001", title: "Birth of Bhimrao Ramji Ambedkar", type: "event", date: "1891-04-14", creator: "Historical Record", language: "English",
    description: "Born in Mhow, Central Provinces (now Madhya Pradesh).",
    content: "Ambedkar was born into the Mahar caste, treated as untouchables. His early life was marked by systemic discrimination, which fueled his lifelong pursuit of equality.",
    source: "Biographical Archives", sourceUrl: "", tags: "birth, early life", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-002", title: "Matriculation and Elphinstone College", type: "event", date: "1907-01-01", creator: "Historical Record", language: "English",
    description: "Passed matriculation and entered Elphinstone College.",
    content: "He became the first from his untouchable community to pass the matriculation exam and enter a college affiliated with the University of Bombay.",
    source: "University of Bombay Archives", sourceUrl: "", tags: "education, matriculation", provenance: "SECONDARY INSTITUTIONAL"
  },
  {
    id: "rec-timeline-003", title: "Graduation from Columbia University", type: "event", date: "1915-06-01", creator: "Historical Record", language: "English",
    description: "Earned an M.A. degree from Columbia University.",
    content: "He majored in Economics, with Sociology, History, Philosophy, and Anthropology as other subjects. His thesis was on 'Ancient Indian Commerce'.",
    source: "Columbia University Archives", sourceUrl: "", tags: "education, columbia, economics", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-004", title: "Mahad Satyagraha", type: "event", date: "1927-03-20", creator: "Dr. B.R. Ambedkar", language: "Marathi",
    description: "Led the Mahad Satyagraha to assert water rights.",
    content: "We are going to the tank to assert our right to water. It is not that drinking the water from this tank will make us immortal. We are going there to establish the fact that we are human beings just like others.",
    source: "Historical Press Records", sourceUrl: "", tags: "satyagraha, mahad, rights", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-005", title: "Kalaram Temple Entry Movement", type: "event", date: "1930-03-02", creator: "Dr. B.R. Ambedkar", language: "Marathi",
    description: "A pivotal satyagraha asserting the right of Dalits to enter the Kalaram Temple in Nashik.",
    content: "This movement was not just about entering a temple, but about asserting equal human rights. Ambedkar led a peaceful procession to claim equal treatment before God and Society.",
    source: "Historical Press Records", sourceUrl: "", tags: "satyagraha, temple, rights", provenance: "SECONDARY INSTITUTIONAL"
  },
  {
    id: "rec-timeline-006", title: "Poona Pact Signed", type: "event", date: "1932-09-24", creator: "Historical Record", language: "English",
    description: "Signed the Poona Pact with Mahatma Gandhi.",
    content: "The agreement provided reserved seats for the depressed classes in the Provisional legislature, replacing the separate electorates proposed by the British.",
    source: "National Archives of India", sourceUrl: "", tags: "poona pact, gandhi, reserved seats", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-007", title: "Founded Independent Labour Party", type: "event", date: "1936-08-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Established a political party to represent workers and the depressed classes.",
    content: "The party opposed the Brahmanical and Capitalist structures and secured 15 seats in the 1937 Bombay elections.",
    source: "Election Archives", sourceUrl: "", tags: "politics, labour party", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-008", title: "Appointed Chairman of Drafting Committee", type: "event", date: "1947-08-29", creator: "Constituent Assembly", language: "English",
    description: "Appointed as the Chairman of the Constitution Drafting Committee.",
    content: "Tasked with writing India's new Constitution, Ambedkar worked tirelessly to ensure the document protected fundamental human rights and provided a framework for a modern democracy.",
    source: "Constituent Assembly Records", sourceUrl: "", tags: "constitution, chairman, drafting", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-009", title: "Resignation over Hindu Code Bill", type: "event", date: "1951-09-27", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Resigned from the Cabinet after the stalling of the Hindu Code Bill.",
    content: "I have been Law Minister for four years. The Hindu Code Bill was the greatest social reform measure ever undertaken. Its stalling leaves me no choice but to resign.",
    source: "Parliamentary Archives", sourceUrl: "", tags: "hindu code bill, women rights", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-timeline-010", title: "Embracing Buddhism at Deekshabhoomi", type: "event", date: "1956-10-14", creator: "Historical Record", language: "Marathi",
    description: "Ambedkar, along with half a million followers, embraces Buddhism in Nagpur.",
    content: "I accept the Navayana Buddhism. By discarding my ancient religion which stood for inequality and oppression, today I am reborn.",
    source: "Historical Press Records", sourceUrl: "", tags: "buddhism, conversion, deekshabhoomi", provenance: "PRIMARY OFFICIAL"
  },

  // --- BOOKS & WRITINGS ---
  {
    id: "rec-book-001", title: "The Problem of the Rupee: Its Origin and Its Solution", type: "book", date: "1923-01-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Ambedkar's thesis for his D.Sc. at the London School of Economics.",
    content: "The thesis explores the history of Indian currency and suggests solutions to its depreciation. It heavily influenced the creation of the Reserve Bank of India.",
    source: "London School of Economics Archives", sourceUrl: "", tags: "economics, rbi, currency", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-book-002", title: "Annihilation of Caste", type: "book", date: "1936-05-15", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Seminal text criticizing the caste system.",
    content: "Turn in any direction you like, caste is the monster that crosses your path. You cannot have political reform, you cannot have economic reform, unless you kill this monster.",
    source: "Dr. Ambedkar Foundation", sourceUrl: "", tags: "caste, social reform", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-003", title: "Who Were the Shudras?", type: "book", date: "1946-01-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "A historical inquiry into the origins of the Shudra varna.",
    content: "Ambedkar attempts to explain how the Shudras, originally part of the Kshatriya varna, were relegated to the fourth varna due to continuous conflicts with Brahmins.",
    source: "Dr. Ambedkar Foundation", sourceUrl: "", tags: "history, varna", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-004", title: "The Untouchables: Who Were They and Why They Became Untouchables?", type: "book", date: "1948-01-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Sequel to 'Who Were the Shudras?'.",
    content: "The book posits that untouchability was the result of the refusal of 'Broken Men' (defeated tribesmen) to give up Buddhism and beef-eating.",
    source: "Dr. Ambedkar Foundation", sourceUrl: "", tags: "history, untouchability", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-005", title: "States and Minorities", type: "book", date: "1947-01-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "A memorandum on the rights of minorities and a proposal for a socialist state.",
    content: "It advocates for state ownership of agriculture and key industries to protect minorities against economic exploitation.",
    source: "Dr. Ambedkar Foundation", sourceUrl: "", tags: "economics, minorities, socialism", provenance: "PRIMARY OFFICIAL"
  },
  {
    id: "rec-book-006", title: "The Buddha and His Dhamma", type: "book", date: "1957-01-01", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "A treatise on Buddha's life and Buddhist philosophy, published posthumously.",
    content: "To maintain the purity of the Dhamma, the Buddha established the Sangha. The Dhamma is meant for the salvation of all beings. Religion is personal, Dhamma is social.",
    source: "Dr. Ambedkar Foundation", sourceUrl: "", tags: "buddhism, religion", provenance: "PRIMARY OFFICIAL"
  },

  // --- SPEECHES & DEBATES ---
  {
    id: "rec-debate-001", title: "Speech on Adoption of the Constitution", type: "debate", date: "1949-11-25", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Final speech at the Constituent Assembly.",
    content: "On the 26th of January 1950, we are going to enter into a life of contradictions. In politics we will have equality and in social and economic life we will have inequality. We must remove this contradiction at the earliest possible moment or else those who suffer from inequality will blow up the structure of political democracy.",
    source: "Constituent Assembly Debates Vol XI", sourceUrl: "https://www.constitutionofindia.net/", tags: "constitution, democracy, equality", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-002", title: "Debate on Constitutional Morality", type: "debate", date: "1948-11-04", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Introducing the Draft Constitution.",
    content: "Constitutional morality is not a natural sentiment. It has to be cultivated. We must realize that our people have yet to learn it. Democracy in India is only a top-dressing on an Indian soil, which is essentially undemocratic.",
    source: "Constituent Assembly Debates Vol VII", sourceUrl: "https://www.constitutionofindia.net/", tags: "constitutional morality, democracy", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-003", title: "Debate on Federalism vs Unitary State", type: "debate", date: "1948-11-04", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Clarification on the nature of the Indian Union.",
    content: "The Draft Constitution is a Federal Constitution inasmuch as it establishes what may be called a Dual Polity. This Dual Polity under the proposed Constitution will consist of the Union at the Centre and the States at the periphery...",
    source: "Constituent Assembly Debates Vol VII", sourceUrl: "https://www.constitutionofindia.net/", tags: "federalism, dual polity", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-004", title: "Discussion on Article 10 (Equality of Opportunity)", type: "debate", date: "1948-11-30", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Debating Article 16 (Draft Article 10) on reservations.",
    content: "We have to safeguard two things namely, the principle of equality of opportunity and at the same time satisfy the demand of communities which have not had so far representation in the State. The draft article strikes a balance.",
    source: "Constituent Assembly Debates", sourceUrl: "https://www.constitutionofindia.net/", tags: "article 10, equality of opportunity, reservations", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-005", title: "Discussion on Uniform Civil Code (Article 44)", type: "debate", date: "1948-11-23", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Debating the implementation of a Uniform Civil Code.",
    content: "I personally do not understand why religion should be given this vast, expansive jurisdiction so as to cover the whole of life and to prevent the legislature from encroaching upon that field.",
    source: "Constituent Assembly Debates", sourceUrl: "https://www.constitutionofindia.net/", tags: "uniform civil code, religion, law", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-006", title: "Discussion on Abolition of Untouchability (Article 17)", type: "debate", date: "1947-04-29", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Passing the resolution to abolish untouchability.",
    content: "Untouchability is abolished and its practice in any form is forbidden. The enforcement of any disability arising out of 'Untouchability' shall be an offence punishable in accordance with law.",
    source: "Constituent Assembly Debates", sourceUrl: "https://www.constitutionofindia.net/", tags: "untouchability, article 17, fundamental rights", provenance: "PRIMARY / DIGITIZED SOURCE"
  },
  {
    id: "rec-debate-007", title: "On Safeguards for Minorities", type: "debate", date: "1947-08-27", creator: "Dr. B.R. Ambedkar", language: "English",
    description: "Addressing the Assembly on minority rights.",
    content: "In this country both the minorities and the majorities have followed a wrong path. It is wrong for the majority to deny the existence of minorities. It is equally wrong for the minorities to perpetuate themselves. A solution must be found.",
    source: "Constituent Assembly Debates", sourceUrl: "https://www.constitutionofindia.net/", tags: "minorities, majority, rights", provenance: "PRIMARY / DIGITIZED SOURCE"
  }
];

try {
  const insertRecord = db.prepare(`
    INSERT OR REPLACE INTO archive_records (id, title, type, date, creator, language, description, content, source, sourceUrl, tags, provenance)
    VALUES (@id, @title, @type, @date, @creator, @language, @description, @content, @source, @sourceUrl, @tags, @provenance)
  `);

  const insertFts = db.prepare(`
    INSERT OR REPLACE INTO archive_fts (id, title, content, description, creator, tags)
    VALUES (@id, @title, @content, @description, @creator, @tags)
  `);

  const insertMany = db.transaction((records) => {
    for (const record of records) {
      insertRecord.run(record);
      insertFts.run(record);
    }
  });

  insertMany(massiveSeedData);
  console.log("Super Massive DB Seed Completed Successfully. Inserted " + massiveSeedData.length + " detailed records spanning timeline, books, and debates.");
} catch (e) {
  console.error("Failed to seed database:", e);
}
