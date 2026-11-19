export function validateAnswers(questions: any[], answers: any[]): string | null {
    for(const a of answers) {
        if (!questions.some((question) => question.id === a.questionId)) {
            return 'Unknown question'
        }

    }

      for (const q of questions) {
            const a = answers.find((a) => a.questionId === q.id)

            if (!a) {
                if (q.required) return `${q.id} required`
                continue
            }

            if (q.type === "text" && !a.value) 
                return `${q.id}: text needed`
            

                 if (q.type === "single_choice" && !q.options.includes(a.selectedOption)) 
                    return `${q.id}: bad options`

                if (q.type === "rating" && !a.rating)
                    return `${q.id}: rating needed`
        }

       return null;
}