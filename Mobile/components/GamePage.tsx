import { FullGame} from "@/types/games.types";
import { User } from "@/types/user.types";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import GameDescription from "./game/GameDescription";
import GameGallery from "./game/GameGallery";
import GameInfo from "./game/GameInfo";
import GameRequirements from "./game/GameRequirements";
import GameRelatedSlider from "./game/GameRelatedSlider";
import GameReviews from "./game/GameReviews";
import GameBuyCard from "./game/GameBuyCard";
import { colors } from "@/theme/colors";
import GameTags from "./game/GameTags";

export default function GamePage({
        game, 
        currentUser 
    }:{
        game: FullGame , 
        currentUser: User
    } ){




    return (
        <ScrollView style={styles.pageGameContainer}>
            <Image source={{uri : game.mainImage}} style={styles.gameImage}/>
            <GameInfo developer={game.developer.name} website={game.website} release={game.releaseDate} tags={game.tags}/>
            
            {!currentUser?.games.some((userGame) => userGame.id === game.id) && (
                <GameBuyCard game={game}/>
            )}
            <GameGallery multimedia={game.multimedia}/>
            <GameDescription description={game.description}/>
            <GameRequirements requirement={game.requirement}/>
            <GameRelatedSlider relatedGames={game.relatedGames}/>
            <GameReviews game={game} currentUser={currentUser}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  pageGameContainer:{
    backgroundColor: colors.grey,
  },
  gameImage: {
    margin: 0,
    width: "100%",
    height: 180,
    resizeMode: "cover"
}});