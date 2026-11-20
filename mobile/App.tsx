import { useState } from "react";
import { View, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SurveyList from "./src/SurveyList";
import SurveyForm from "./src/SurveyForm";
import SurveyResults from "./src/SurveyResults";
import { Survey } from "./src/api";

const queryClient = new QueryClient();

type Screen =
  | { name: "list" }
  | { name: "fill"; survey: Survey }
  | { name: "results"; survey: Survey };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "list" });
  const [toast, setToast] = useState("");
  const back = () => setScreen({ name: "list" });

  const onDone = () => {
    back();
    setToast("Дякуємо! Відповідь збережено");
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {screen.name === "list" && (
        <SurveyList
          onFill={(survey) => setScreen({ name: "fill", survey })}
          onResults={(survey) => setScreen({ name: "results", survey })}
        />
      )}

      {screen.name === "fill" && (
        <SurveyForm survey={screen.survey} onBack={back} onDone={onDone} />
      )}

      {screen.name === "results" && (
        <SurveyResults survey={screen.survey} onBack={back} />
      )}

      {toast !== "" && (
        <View
          style={{
            position: "absolute",
            bottom: 40,
            left: 16,
            right: 16,
            backgroundColor: "#222",
            padding: 14,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>{toast}</Text>
        </View>
      )}
    </QueryClientProvider>
  );
}
