import { Game, Review } from "@/types/games.types";
import { Text, View } from "react-native";

export default function GameReviews(reviews : {reviews: Review[]}){
    return(
        <View>
            <Text>Related Games</Text>
        </View>
    )
}