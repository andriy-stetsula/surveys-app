import { pool } from './db'

const questions = [
  { id: "q1", type: "text", text: "Що вам подобається в застосунку?", required: true },
  { id: "q2", type: "single_choice", text: "Що для вас важливіше?", required: true, options: ["fast", "simple", "beautiful"] },
  { id: "q3", type: "rating", text: "Оцініть застосунок", required: true },
]

async function seed() {
   try {

        await pool.query(
    `INSERT INTO surveys (id, title, description, status, questions)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id) DO NOTHING`,
      ["srv_1", "Відгук про застосунок", "Коротке опитування", "active", JSON.stringify(questions)]
);
console.log("Seed done");
   } finally {
console.log("Seed done");
   }


}

seed().catch((err) => {
    console.log(err)
      process.exit(1)
})