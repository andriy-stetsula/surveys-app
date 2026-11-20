const API_URL = "http://192.168.0.100:3000"

export type Question = {
    id:string
    type: "text" | "single_choice" | "rating"
    text:string
    required:boolean
    options?:string[]
}

export type Survey = {
  id: string
  title: string
  description: string
  questions: Question[]
}

export type Answer = {
  questionId: string
  value?: string
  selectedOption?: string
  rating?: number
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + path, options)
  const data = await res.json()
  if (!res.ok) throw new Error(data.error ?? "Щось пішло не так")
  return data
}

export const getSurveys = () => request<Survey[]>("/surveys")

export const getResults = (id: string) => request<any>(`/surveys/${id}/results`)

export const submitResponse = (id: string, userId: string, answers: Answer[]) =>
  request(`/surveys/${id}/responses`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-user-id": userId },
    body: JSON.stringify({ answers }),
  })