import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Question } from "./api";
import { style } from "./SurveyForm.styles";

type Props = { q: Question; value: any; onChange: (v: any) => void };

export default function QuestionInput({ q, value, onChange }: Props) {
  if (q.type === "text")
    return (
      <TextInput value={value} onChangeText={onChange} style={style.input} />
    );

  if (q.type === "single_choice")
    return (
      <View>
        {q.options?.map((o) => (
          <TouchableOpacity
            key={o}
            onPress={() => onChange(o)}
            style={style.option}
          >
            <Text>
              {value === o ? "◉" : "○"} {o}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );

  return (
    <View style={style.stars}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity key={n} onPress={() => onChange(n)}>
          <Text style={style.star}>{value >= n ? "★" : "☆"}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
