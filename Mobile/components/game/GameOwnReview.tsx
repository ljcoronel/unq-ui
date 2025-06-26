import { colors } from "@/theme/colors";
import { FullGame, Review } from "@/types/games.types";
import { User } from "@/types/user.types";
import { Feather } from "@expo/vector-icons";
import { Image, View, Text, StyleSheet } from "react-native";

export default function GameOwnReview({
  user,
  review,
}: {
  user: User;
  review: Review;
}) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Image style={styles.userImage} source={{ uri: user.image }} />
        <Text style={styles.reviewUserName}>{user.name}</Text>
        {review.isRecommended ? (
          <Feather
            style={styles.recomended}
            name="thumbs-up"
            size={24}
            color={colors.lightGrey}
          />
        ) : (
          <Feather
            style={styles.notRecomended}
            name="thumbs-down"
            size={24}
            color={colors.lightGrey}
          />
        )}
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewCard: {
    padding: 10,
    backgroundColor: colors.grey2,
    marginBottom: 15,
    borderColor: colors.violet,
    borderWidth: 2,
    elevation: 1,
  },
  reviewHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    alignItems: "center",
    marginBottom: 25,
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
  reviewText: {
    padding: 5,
    alignItems: "center",
    fontSize: 16,
    fontWeight: 500,
    color: colors.lightGrey,
    fontFamily: "Inter",
  },
  destacado: {
    alignSelf: "flex-end",
  },
});
