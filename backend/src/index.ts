import express from 'express';
import { pool } from './db'

const app = express()
app.use(express.json());

app.get("/surveys",async (req, res) => {
    const result = await pool.query("SELECT id,title,description,status,questions FROM surveys WHERE status = $1", ["active"])
    res.json()
})

app.get("/health", async (req, res) => {
    const result = await pool.query("SELECT NOW()")
    res.json(result.rows)
})

app.listen(3000, () => 
    console.log("Server on localhost:3000")
)