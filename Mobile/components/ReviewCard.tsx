import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { Review } from "@/types/games.types";
import { Ionicons } from "@expo/vector-icons";

export default function ReviewCard({ review }: { review: Review }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.reviewContainer}
      onPress={() => router.push(`/game/${review.game.id}`)}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={review.isRecommended ? "thumbs-up" : "thumbs-down"}
          size={32}
          style={review.isRecommended ? styles.isRecommended : styles.notRecommended}
        />
      </View>
      <Image
        source={{ uri: review.game.mainImage }}
        style={styles.reviewImage}
      />
      <View style={styles.reviewTitleContainer}>
        <Text style={styles.reviewTitle}>{review.game.name}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reviewContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 2,
    elevation: 3,
  },
  reviewImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  reviewTitleContainer: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  reviewTitle: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "Inter",
    textTransform: "uppercase",
    color: colors.darkGrey,
  },
  reviewText: {
    fontSize: 20,
    color: colors.darkGrey,
    fontWeight: "600",
    fontFamily: "Inter",
  },
  isRecommended: {
    color: '#80d8ff',
    backgroundColor: '#09acf2',
    padding: 3,
    borderRadius: 5,
  },
  notRecommended: {
    color:  '#f44336',
    backgroundColor: '#ff7961',
    padding: 3,
    borderRadius: 5,
  },
});
