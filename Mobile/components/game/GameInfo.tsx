import { GameTag } from "@/types/games.types";
import { StyleSheet, Text, View } from "react-native";
import GameTags from "./GameTags";

export default function GameInfo(
    {developer,website,release, tags} : {
        developer: string,
        website: string,
        release: string,
        tags: GameTag[]
    } ){
    return (
        <View style = {styles.infoContainer}>
            <View style={styles.infoFieldContainer}><Text style={styles.infoTitle}>Developer: </Text><Text style={styles.infoFieldValue}>{developer}</Text></View> 
            <View style={styles.infoFieldContainer}><Text style={styles.infoTitle}>Website: </Text><Text style={styles.infoFieldValue}>{website}</Text></View>
            <View style={styles.infoFieldContainer}><Text style={styles.infoTitle}>Release Date: </Text><Text>{release.split('T')[0]}</Text></View>
            <GameTags tags = {tags}/>
        </View>
    )
}

const styles = StyleSheet.create({
    infoContainer : {
        padding: 20
    },
    infoTitle:{
        fontWeight: 600,
    },
    infoFieldContainer :{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        paddingBottom: 10,
    },
    infoFieldValue :{
        textDecorationLine : 'underline'
    },
});