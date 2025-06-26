import { StyleSheet } from 'react-native';
import {colors} from "@/theme/colors";

export const cartWithoutGamesStyles = StyleSheet.create({
    cartWithoutGamesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addGamesContainer: {
        height: 110,
        gap: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: colors.darkGrey,
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 32,
    },
});