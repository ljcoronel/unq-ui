import { StyleSheet } from "react-native";
import { colors } from "../theme/colors";

export const sectionTitle = StyleSheet.create({
  text: {
    fontSize: 20,
    color: colors.darkGrey,
    fontFamily: "Inter",
    fontWeight: "700",
    fontStyle: "normal",
    textTransform: "uppercase",
  },
});

export const headerStyles = StyleSheet.create({
  header: {
    color: colors.darkGrey,
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 25,
    lineHeight: 28,
  },
});