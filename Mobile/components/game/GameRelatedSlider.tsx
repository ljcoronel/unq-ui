import { colors } from "@/constants/colors";
import { Game } from "@/types/games.types";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, ImageBackground } from "react-native";

export default function GameRelatedSlider(relatedGames : {relatedGames: Game[]}){
    return(
        <View style={styles.relatedGamesContainer}>
            <Text style={styles.relatedTitle}>RELATED GAMES</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
                {relatedGames.relatedGames.map((game, idx) => 
                    <TouchableOpacity  style={styles.imageContainer} key={idx} onPress={()=>router.replace(`../game/${game.id}`)}>
                        <ImageBackground source={{uri: game.mainImage}} style={styles.image}>
                            <Text style={styles.gameName}>{game.name.toUpperCase()}</Text>
                        </ImageBackground>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    relatedGamesContainer :{
        padding: 20,

    },
    relatedTitle: {
        fontFamily: "Inter",
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 10
    },
    scrollContainer: {
    },
    imageContainer: {
        marginRight: 5,
    },
    image: {
        height: 300,
        aspectRatio: 3/4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameName: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        fontSize: 25,
        fontWeight: 800,
        color: colors.lightGrey,
        fontFamily: "Inter",
        marginTop: 180,
        marginHorizontal: 10

    },
});
