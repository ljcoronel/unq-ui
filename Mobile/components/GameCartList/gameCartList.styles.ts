import {StyleSheet} from 'react-native';
import {colors} from "@/theme/colors";

export const gameCartListStyles = StyleSheet.create({
    gameCartList: {
        backgroundColor: colors.grey2,
        width: 377,
        height: 586,
        borderRadius: 8,
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    listFix: {
        paddingBottom: 37
    },
    headerContainer: {
        gap: 16,
    },
    header: {
        color: colors.lightGrey,
        fontFamily: 'Inter',
        fontSize: 24,
        lineHeight: 18,
    },
    headerLine: {
        height: 1,
        backgroundColor: colors.lightGrey,
        marginBottom: 16,
    },
    listSeparator: {
        height: 16,
    },
});