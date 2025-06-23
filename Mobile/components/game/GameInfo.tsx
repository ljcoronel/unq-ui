import { Text, View } from "react-native";

export default function GameInfo(
    {developer,website,release} : {
        developer: string,
        website: string,
        release: string
    } ){
    return (
        <View>
            <Text>Game description</Text>
        </View>
    )
}