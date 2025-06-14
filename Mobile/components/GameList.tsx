import { View, StyleSheet } from "react-native";
import { Game } from "@/context/GamesContext";
import GameCard from "@/components/GameCard";

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
