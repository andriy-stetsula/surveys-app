import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SurveyList from "./src/SurveyList";
import { View, Text, TouchableOpacity } from "react-native";
import { Survey } from "./src/api";

const queryClient = new QueryClient();

type Screen =
  | { name: "list" }
  | { name: "fill"; survey: Survey }
  | { name: "results"; survey: Survey };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "list" });
  const back = () => setScreen({ name: "list" });

  return (
    <QueryClientProvider client={queryClient}>
      {screen.name === "list" && (
        <SurveyList
          onFill={(survey) => setScreen({ name: "fill", survey })}
          onResults={(survey) => setScreen({ name: "results", survey })}
        />
      )}
      {screen.name !== "list" && (
        <View style={{ marginTop: 60, padding: 16 }}>
          <TouchableOpacity onPress={back}>
            <Text>← Назад</Text>
          </TouchableOpacity>
          <Text>
            {screen.name}: {screen.survey.title}
          </Text>
        </View>
      )}
    </QueryClientProvider>
  );
}
