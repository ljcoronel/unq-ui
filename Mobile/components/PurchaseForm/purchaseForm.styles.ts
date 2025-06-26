import { StyleSheet } from 'react-native';
import {colors} from "@/theme/colors";

export const purchaseFormStyles = StyleSheet.create({
    userCardForm: {
        width: 361,
        height: 472,
        paddingVertical: 16,
        paddingHorizontal: 8,
        gap: 32,
    },
    cardDetail: {
        height: 64,
    },
    cardDetailText: {
        color: colors.darkGrey,
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 28,
    },
    input: {
        backgroundColor: colors.lightGrey,
        height: 36,
        paddingVertical: 0,
    },
    error: {
        color: "red",
        fontSize: 16,
        marginBottom: 16,
    },
});