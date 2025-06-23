import { Text, ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import SafeScreen from "@/components/SafeScreen";
import { useAuth } from "@/context/AuthContext";
import { useGames } from "@/context/GamesContext";
import { useEffect, useState } from "react";
import { FullGame, Game } from "@/types/games.types";
import Loading from "@/components/Loading";
import GamePage from "@/components/GamePage";

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading,setLoading] = useState(true);
  const {user: currentUser} = useAuth();
  const {getGameById} = useGames(); 
  const [game, setGame] = useState<FullGame | null>(null);
  const navigation = useNavigation();

  useEffect(()=>{
    const fetchGame = async () => {
      const game = await getGameById(id as string);
      setGame(game);
      setLoading(false);
      navigation.setOptions({
        title: game?.name
      });
    }
    fetchGame();  
  },[])

  if(isLoading){
    return <Loading/>;
  }

  return (
    <SafeScreen>
      <GamePage
        game = {game!}
        currentUser = {currentUser!}
      />
    </SafeScreen>
  );
}

const styles = StyleSheet.create({});
