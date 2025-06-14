import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { colors } from "@/constants/colors";

export default function Loading({
  message = "Cargando...",
}: {
  message?: string;
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.violet} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGrey,
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    color: colors.darkGrey,
    fontWeight: "600",
  },
});
