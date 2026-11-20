import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  list: { marginTop: 60 },
  card: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  title: { fontWeight: "700", fontSize: 18, marginBottom: 4 },
  description: { color: "#6b7280", marginBottom: 12 },
  actions: { flexDirection: "row", gap: 8 },
  button: { backgroundColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "600" },
  buttonOutline: { borderWidth: 1, borderColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  buttonOutlineText: { color: "#2563eb", fontWeight: "600" },
  link: { color: "#2563eb", marginTop: 8 },
})