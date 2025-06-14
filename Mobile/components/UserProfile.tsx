import { User } from "@/types/user.types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { colors } from "@/constants/colors";
import { useAuth } from "@/context/AuthContext";
import GameCard from "./GameCard";
import { sectionTitle } from "@/constants/styles";
import { Review } from "@/types/games.types";
import ReviewCard from "./ReviewCard";
import { router } from "expo-router";

export default function UserProfile({
  isCurrentUser,
  user,
  isFriend,
  handleAddOrRemoveFriend,
}: {
  isCurrentUser: boolean;
  user: User;
  isFriend: boolean;
  handleAddOrRemoveFriend: (userId: string) => void;
}) {
  const { logout } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: user.image }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{user.name || "[USER-LOGIN]"}</Text>
          {isCurrentUser ? (
            <TouchableOpacity style={styles.logoutButton} onPress={() => {
              router.push("/user/u_4")
            }}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleAddOrRemoveFriend(user.id)}
            >
              <Text style={styles.logoutText}>
                {isFriend ? "Remove Friend" : "Add Friend"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isCurrentUser ? (
        <View style={styles.listsContainer}>
          <Text style={sectionTitle.text}>YOUR GAMES</Text>
          <View style={styles.listContainer}>
            {user.games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.listsContainer}>
          <Text style={sectionTitle.text}>REVIEWS</Text>
          <View style={styles.listContainer}>
            {user.reviews.map((review: Review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.lightGrey,
  },
  username: {
    fontWeight: "700",
    fontSize: 24,
    color: colors.darkGrey,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: colors.violet,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 10,
    width: "100%",
  },
  listsContainer: {
    flex: 1,
    padding: 10,
    gap: 8,
  },
  listContainer: {
    flex: 1,
    gap: 10,
  },
  logoutText: {
    color: colors.lightGrey,
    fontWeight: "600",
    fontSize: 18,
  },
});
