import { View, StyleSheet } from "react-native";
import GameCard from "@/components/GameCard";
import { Game } from "@/types/games.types";

export default function GameList({ games }: { games: Game[] }) {
  return (
    <View style={styles.gamesContainer}>
      {games.map((game, index) => (
        <GameCard key={`${game.id}-${index}`} game={game} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gamesContainer: {
    flex: 1,
    gap: 10,
  },
});
