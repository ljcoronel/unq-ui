import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const gameCartStyles = StyleSheet.create({
  gameCartContainer: {
    backgroundColor: colors.lightGrey,
    borderRadius: 8,
    paddingBottom: 8,
    gap: 8,
  },
  gameCartImage: {
    height: 161,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  gameCartDetails: {
    paddingHorizontal: 8,
    gap: 8,
  },
  gameCartTitle: {
    color: colors.darkGrey,
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 28,
    textTransform: "uppercase",
  },
  gameCartPrice: {
    color: colors.violet,
    fontFamily: "Inter",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 28,
  },
});
