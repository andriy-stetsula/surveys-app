import { Router } from 'express'
import { object, array, string, number} from 'zod'
import { pool } from './db'
import { validateAnswers } from './validate'

export const router = Router();

const schema = object({
    answers:array(object({
         questionId: string(),
    value: string().optional(),
    selectedOption: string().optional(),
    rating: number().int().min(1).max(5).optional(),
    }))
})

router.get("/surveys", async(req,res) => {
    const { rows } = await pool.query(
          "SELECT id, title, description, status, questions FROM surveys WHERE status = 'active'"
    )
    res.json(rows)
})

router.post("/surveys/:id/responses", async (req, res) => {
  const userId = req.header("x-user-id")
  const parsed = schema.safeParse(req.body)

  if (!userId || !parsed.success) {
    res.status(400).json({ error: "Invalid request" })
    return
  }

  const { rows } = await pool.query("SELECT status, questions FROM surveys WHERE id = $1", [req.params.id]);
  const survey = rows[0]


  if (!survey || survey.status !== "active") {
    res.status(404).json({ error: "Active survey not found" })
    return
  }


  const error = validateAnswers(survey.questions, parsed.data.answers)
  if (error) {
    res.status(400).json({ error })
    return
  }

    await pool.query(
    "INSERT INTO responses (survey_id, user_id, answers) VALUES ($1, $2, $3)",
    [req.params.id, userId, JSON.stringify(parsed.data.answers)]
  )
  res.status(201).json({ ok: true })
})

router.get('/surveys/:id/results', async (req, res) => {
    const survey = await pool.query(
        'SELECT questions FROM surveys WHERE id = $1',
        [req.params.id]
    ) 
    if (!survey.rows[0]) {
        res.status(404).json({error: "Survey not found"})
        return;
    }

    const { rows } = await pool.query(
        'SELECT answers FROM responses WHERE survey_id = $1',
        [req.params.id]
    )

    const all = rows.flatMap((r) => r.answers)

    const results = survey.rows[0].questions.map((q:any) => {
        const mine = all.filter((a:any) => a.questionId === q.id)


    if (q.type === "single_choice") {
      const counts: Record<string, number> = {}
      for (const o of q.options) counts[o] = 0
      for (const a of mine) counts[a.selectedOption]++
      return { questionId: q.id, text: q.text, type: q.type, counts }
    }

     if (q.type === "rating") {
      const sum = mine.reduce((s: number, a: any) => s + a.rating, 0)
      const average = mine.length ? sum / mine.length : 0
      return { questionId: q.id, text: q.text, type: q.type, average }
    }

    return {
      questionId: q.id,
      text: q.text,
      type: q.type,
      answers: mine.map((a: any) => a.value),
    }

    })


     res.json({ surveyId: req.params.id, totalResponses: rows.length, results })
})