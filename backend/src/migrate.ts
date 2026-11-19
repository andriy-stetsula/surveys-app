import { pool } from './db'

async function migrate() {
    try {
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
      );
        `)

        console.log("Migration done")
    } finally {
        await pool.end();
    }
}

migrate().catch((err) => {
    console.log(err);
    process.exit(1);
})