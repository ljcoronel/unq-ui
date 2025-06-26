import { StyleSheet, Text, View } from "react-native";

export default function GameDescription(description : {description:string}){
    return (
        <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>ABOUT THIS GAME</Text>
            <Text style={styles.description}>{description.description}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    descriptionContainer: {
        padding: 20,
    },
    descriptionTitle: {
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 10
    },
    description: {
        fontFamily:"Inter",
        fontSize: 14,
        fontWeight: 600

    },
});