import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const addGamesButtonStyles = StyleSheet.create({
  addGamesButton: {
    backgroundColor: colors.green,
    width: 172,
    height: 56,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.darkGrey,
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 20,
    lineHeight: 28,
  },
});
