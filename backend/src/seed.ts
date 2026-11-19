import { pool } from './db'

const questions = [
  { id: "q1", type: "text", text: "Що вам подобається в застосунку?", required: true },
  { id: "q2", type: "single_choice", text: "Що для вас важливіше?", required: true, options: ["fast", "simple", "beautiful"] },
  { id: "q3", type: "rating", text: "Оцініть застосунок", required: true },
]

const surveys = [
  { id: "srv_1", title: "Відгук про застосунок", description: "Коротке опитування", status: "active", questions },
  { id: "srv_2", title: "Чернетка", description: "Ще не опубліковано", status: "draft", questions },
  { id: "srv_3", title: "Закрите опитування", description: "Більше не приймає відповіді", status: "closed", questions },
]

async function seed() {
   try {
    for (const s of surveys) {
     await pool.query(
    `INSERT INTO surveys (id, title, description, status, questions)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO NOTHING`,
      [s.id, s.title, s.description, s.status, JSON.stringify(s.questions)]
);
    }
console.log("Seed done");
   } finally {
await pool.end();
   }


}

seed().catch((err) => {
    console.log(err)
      process.exit(1)
})