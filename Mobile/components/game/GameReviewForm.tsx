import { colors } from "@/theme/colors";
import { useGames } from "@/context/GamesContext";
import { FullGame } from "@/types/games.types";
import { User } from "@/types/user.types";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export default function GameReviewForm({
  user,
  game,
}: {
  user: User;
  game: FullGame;
}) {
  const [review, setReview] = useState({ isRecommended: false, text: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { addReview } = useGames();
  const [error, setError] = useState("");

  const handleAddReview = async (isRecommended: boolean, text: string) => {
    try {
      setIsLoading(true);
      await addReview(game.id, isRecommended, text);
      setIsLoading(false);
    } catch (error) {
      setError("Error al agregar review");
    }
  };

  if (error) {
    alert(error);
    return;
  }

  return (
    <View style={styles.reviewFormCard}>
      <View style={styles.reviewHeader}>
        <Image style={styles.userImage} source={{ uri: user.image }} />
        <Text style={styles.reviewUserName}>{user.name}</Text>
      </View>

      <View style={styles.recomendedInput}>
        <Text style={styles.label}>Recomended</Text>
        <TouchableOpacity
          onPress={() => setReview({ ...review, isRecommended: true })}
        >
          <Feather
            style={[styles.recomended, review.isRecommended && styles.selected]}
            name="thumbs-up"
            size={24}
            color={colors.lightGrey}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setReview({ ...review, isRecommended: false })}
        >
          <Feather
            style={[
              styles.notRecomended,
              !review.isRecommended && styles.selected,
            ]}
            name="thumbs-down"
            size={24}
            color={colors.lightGrey}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Text</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a comment"
        value={review.text}
        onChangeText={(text) => setReview({ ...review, text: text })}
      />

      <TouchableOpacity
        onPress={() => handleAddReview(review.isRecommended, review.text)}
        style={styles.button}
        //con esto no dejo que agreguen comentarios vacios
        disabled={!review.text.trim()}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.label}>Add Review</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewFormCard: {
    padding: 10,
    backgroundColor: colors.grey2,
    marginBottom: 15,
  },
  reviewHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    padding: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    aspectRatio: 1,
    borderColor: colors.lightGrey,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 20,
  },
  recomended: {
    backgroundColor: "#09acf2",
    padding: 5,
    borderRadius: 5,
    transform: [{ scaleX: -1 }],
    opacity: 0.5,
  },
  notRecomended: {
    backgroundColor: "#f44336",
    padding: 5,
    borderRadius: 5,
    opacity: 0.5,
  },
  reviewUserName: {
    fontSize: 20,
    fontWeight: 800,
    color: colors.lightGrey,
    fontFamily: "Inter",
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 5,
    height: 80,
    paddingHorizontal: 12,
    fontSize: 18,
    marginBottom: 15,
    marginTop: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 600,
    color: colors.lightGrey,
    fontFamily: "Inter",
  },
  recomendedInput: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  selected: {
    borderColor: colors.lightGrey,
    borderWidth: 2,
    borderRadius: 8,
    elevation: 2,
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.violet,
    padding: 10,
    borderRadius: 5,
  },
});
