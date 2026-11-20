import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Survey, Answer, submitResponse } from "./api";
import { useUserStore } from "./store";
import { buildSchema } from "./schema";
import QuestionInput from "./QuestionInput";
import { style } from "./SurveyForm.styles";

type Props = { survey: Survey; onDone: () => void; onBack: () => void };

export default function SurveyForm({ survey, onDone, onBack }: Props) {
  const userId = useUserStore((s) => s.userId);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Record<string, any>>({
    resolver: zodResolver(buildSchema(survey.questions)),
    defaultValues: Object.fromEntries(
      survey.questions.map((q) => [q.id, q.type === "rating" ? undefined : ""]),
    ),
  });

  const mutation = useMutation({
    mutationFn: (answers: Answer[]) =>
      submitResponse(survey.id, userId, answers),
    onSuccess: onDone,
  });

  const onSubmit = (values: Record<string, any>) => {
    const answers: Answer[] = survey.questions
      .filter((q) => values[q.id] !== undefined && values[q.id] !== "")
      .map((q) => {
        const v = values[q.id];
        if (q.type === "text") return { questionId: q.id, value: v };
        if (q.type === "single_choice")
          return { questionId: q.id, selectedOption: v };
        return { questionId: q.id, rating: v };
      });
    mutation.mutate(answers);
  };

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={onBack}>
        <Text>← Назад</Text>
      </TouchableOpacity>
      <Text style={style.title}>{survey.title}</Text>

      {survey.questions.map((q) => (
        <View key={q.id} style={style.question}>
          <Text style={style.label}>
            {q.text} {q.required ? "*" : ""}
          </Text>
          <Controller
            control={control}
            name={q.id}
            render={({ field: { value, onChange } }) => (
              <QuestionInput q={q} value={value} onChange={onChange} />
            )}
          />
          {errors[q.id] && (
            <Text style={style.error}>{String(errors[q.id]?.message)}</Text>
          )}
        </View>
      ))}

      {mutation.error && (
        <Text style={style.error}>
          Не вдалось відправити: {(mutation.error as Error).message}
        </Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
        style={style.button}
      >
        <Text style={style.buttonText}>
          {mutation.isPending ? "Відправка..." : "Відправити"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
