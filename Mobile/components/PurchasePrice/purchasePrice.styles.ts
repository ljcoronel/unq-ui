import { StyleSheet } from 'react-native';
import {colors} from "@/theme/colors";

export const purchasePriceStyles = StyleSheet.create({
    priceContainer: {
        backgroundColor: colors.grey2,
        width: 361,
        height: 120,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16,
        gap: 16,
    },
});