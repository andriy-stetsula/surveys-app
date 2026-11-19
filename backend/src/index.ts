import express from 'express';
import { pool } from './db'

const app = express()
app.use(express.json());

app.get("/surveys",(req, res) => {
    res.json([])
})

app.get("/health", async (req, res) => {
    const result = await pool.query("SELECT NOW()")
    res.json(result.rows[0])
})

app.listen(3000, () => 
    console.log("Server on localhost:3000")
)