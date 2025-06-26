import { StyleSheet, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useGames } from "@/context/GamesContext";
import { useEffect, useState } from "react";
import { FullGame } from "@/types/games.types";
import Loading from "@/components/Loading";
import GamePage from "@/components/GamePage";

export default function GameScreen() {
  const { id } = useLocalSearchParams();
  const [isLoading, setLoading] = useState(true);
  const { user: currentUser } = useAuth();
  const { getGameById } = useGames();
  const [game, setGame] = useState<FullGame | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGame = async () => {
      const game = await getGameById(id as string);
      setGame(game);
      setLoading(false);
      navigation.setOptions({
        title: game?.name.toUpperCase(),
      });
    };
    fetchGame();
  }, [game]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <GamePage game={game!} currentUser={currentUser!} />
    </View>
  );
}

const styles = StyleSheet.create({});
