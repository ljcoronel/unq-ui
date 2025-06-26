import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Game } from "@/types/games.types";
import { colors } from "@/theme/colors";

export default function GameCard({ game }: { game: Game }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.gameContainer}
      onPress={() => router.push(`/game/${game.id}`)}
    >
      <Image source={{ uri: game.mainImage }} style={styles.gameImage} />
      <View style={styles.gameTitleContainer}>
        <Text style={styles.gameTitle}>{game.name}</Text>
        <View style={styles.gameTagsContainer}>
          {game.tags.map((tag, idx) => (
            <Text key={`${game.id}-${tag.id}-${idx}`} style={styles.gameTag}>
              {tag.name}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gameContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  gameImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  gameTitleContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "Inter",
    textTransform: "uppercase",
    color: colors.darkGrey,
  },
  gameTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  gameTag: {
    fontSize: 14,
    color: colors.darkGrey,
    fontWeight: "600",
    fontFamily: "Inter",
    textDecorationLine: "underline",
  },
});
