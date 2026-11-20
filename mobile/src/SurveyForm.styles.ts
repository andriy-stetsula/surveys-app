import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  container: { marginTop: 60, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 12 },
  question: { marginBottom: 20 },
  label: { fontWeight: "600" },
  input: { borderWidth: 1, borderRadius: 6, padding: 8, marginTop: 6 },
  option: { paddingVertical: 6 },
  stars: { flexDirection: "row", marginTop: 6 },
  star: { fontSize: 32 },
  error: { color: "red" },
  button: { backgroundColor: "#2563eb", padding: 14, borderRadius: 8, marginBottom: 40 },
  buttonText: { color: "white", textAlign: "center" },
})