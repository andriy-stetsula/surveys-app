import { pool } from './db'

const questing = [
  { id: "q1", type: "text", text: "Що вам подобається в застосунку?", required: true },
  { id: "q2", type: "single_choice", text: "Що для вас важливіше?", required: true, options: ["fast", "simple", "beautiful"] },
  { id: "q3", type: "rating", text: "Оцініть застосунок", required: true },
]

async function seed() {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS surveys (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      questions JSONB NOT NULL
    );    
    CREATE TABLE IF NOT EXISTS responses (
      id SERIAL PRIMARY KEY,
      survey_id TEXT NOT NULL REFERENCES surveys(id),
      user_id TEXT NOT NULL,
      answers JSONB NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    `)

await pool.query(
    `INSERT INTO surveys (id, title, description, status, questions)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO NOTHING`,
      ["srv_1", "Відгук про застосунок", "Коротке опитування", "active", JSON.stringify(questions)]
);

console.log("Seed done");
await pool.end();
}
