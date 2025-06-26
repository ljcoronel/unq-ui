import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const gameCartPurchaseStyles = StyleSheet.create({
  gameCartPurchaseContainer: {
    backgroundColor: colors.grey2,
    width: 377,
    height: 192,
    borderRadius: 8,
    paddingVertical: 24,
    paddingHorizontal: 16,
    gap: 16,
  },
  gameCartPurchaseDetails: {
    height: 28,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gameCartPurchaseFees: {
    color: colors.lightGrey,
    fontFamily: "Inter",
    fontWeight: "300",
    fontSize: 18,
    lineHeight: 28,
  },
  gameCartPurchaseTotal: {
    color: colors.lightGrey,
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 28,
  },
});
