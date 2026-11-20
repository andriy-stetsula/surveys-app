import { object, string, number, ZodType } from "zod"
import { Question } from "./api"

export function buildSchema(questions: Question[]) {
      const shape: Record<string, ZodType> = {}

    for (const q of questions) {
    if (q.type === "rating") {
      const rating = number({ error: "Оберіть оцінку" }).min(1).max(5)
      shape[q.id] = q.required ? rating : rating.optional()
    } else {
      const text = string().trim()
      shape[q.id] = q.required ? text.min(1, "Обов'язкове питання") : text.optional()
    }
  }
  return object(shape)
}