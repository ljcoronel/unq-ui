import { Game } from "@/types/games.types";
import { Text, View } from "react-native";

export default function GameRelatedSlider(relatedGames : {relatedGames: Game[]}){
    return(
        <View>
            <Text>Related Games</Text>
        </View>
    )
}