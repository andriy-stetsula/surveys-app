import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { style } from "./SurveyList.styles";
import { getSurveys, Survey } from "./api";

type Props = {
  onFill: (s: Survey) => void;
  onResults: (s: Survey) => void;
};

export default function SurveyList({ onFill, onResults }: Props) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["surveys"],
    queryFn: getSurveys,
  });

  if (isLoading) return <ActivityIndicator style={style.center} size="large" />;

  if (error)
    return (
      <View style={style.center}>
        <Text>Не вдалось завантажити {(error as Error).message}</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={style.link}>Спробувати ще</Text>
        </TouchableOpacity>
      </View>
    );

  if (!data?.length)
    return (
      <View style={style.center}>
        <Text>Немає активних опитувань</Text>
      </View>
    );

  return (
    <FlatList
      style={style.list}
      data={data}
      keyExtractor={(item: Survey) => item.id}
      renderItem={({ item }) => (
        <View style={style.card}>
          <Text style={style.title}>{item.title}</Text>
          <Text style={style.description}>{item.description}</Text>
          <View style={style.actions}>
            <TouchableOpacity style={style.button} onPress={() => onFill(item)}>
              <Text style={style.buttonText}>Пройти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.buttonOutline}
              onPress={() => onResults(item)}
            >
              <Text style={style.buttonOutlineText}>Результати</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
