import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Survey, getResults } from "./api";
import { style } from "./SurveyResults.styles";

type Props = { survey: Survey; onBack: () => void };

export default function SurveyResults({ survey, onBack }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["results", survey.id],
    queryFn: () => getResults(survey.id),
  });

  return (
    <ScrollView style={style.container}>
      <TouchableOpacity onPress={onBack}>
        <Text>← Назад</Text>
      </TouchableOpacity>
      <Text style={style.title}>{survey.title}</Text>

      {isLoading && <ActivityIndicator size="large" />}

      {error && (
        <View>
          <Text style={style.error}>
            Не вдалось завантажити: {(error as Error).message}
          </Text>
          <TouchableOpacity onPress={() => refetch()}>
            <Text style={style.link}>Спробувати ще</Text>
          </TouchableOpacity>
        </View>
      )}

      {data && (
        <View>
          <Text style={style.total}>Відповідей: {data.totalResponses}</Text>

          {data.results.map((r: any) => (
            <View key={r.questionId} style={style.block}>
              <Text style={style.label}>{r.text}</Text>

              {r.type === "single_choice" &&
                Object.entries(r.counts).map(([option, count]) => (
                  <Text key={option}>
                    {option}: {String(count)}
                  </Text>
                ))}

              {r.type === "rating" && (
                <Text>Середня оцінка: {r.average.toFixed(1)}</Text>
              )}

              {r.type === "text" &&
                (r.answers.length ? (
                  r.answers.map((a: string, i: number) => (
                    <Text key={i}>• {a}</Text>
                  ))
                ) : (
                  <Text>Ще немає відповідей</Text>
                ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
