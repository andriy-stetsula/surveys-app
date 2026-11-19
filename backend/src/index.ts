import express from 'express';

const app = express()
app.use(express.json());

app.get("/surveys",(req, res) => {
    res.json([])
})

app.listen(3000, () => 
    console.log("Server on localhost:3000")
)