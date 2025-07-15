import { useLocalSearchParams, useNavigation } from "expo-router";
import { useState, useEffect } from "react";
import { User } from "@/types/user.types";
import SafeScreen from "@/components/SafeScreen";
import UserProfile from "@/components/UserProfile";
import { useUsers } from "@/context/UserContext";
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const { getUserById, addOrRemoveFriend, getFriendsOfUser } = useUsers();
  const navigation = useNavigation();
  const [isFriend, setIsFriend] = useState(false);
  const { user: currentUser } = useAuth();
  
  const handleAddOrRemoveFriend = async (userId: string) => {
    try {
      setLoadingButton(true);
      await addOrRemoveFriend(userId);
      await getIsFriend();
    } catch (error) {
      console.error("Error adding friend:", error);
    } finally {
      setLoadingButton(false);
    }
  };

  const getIsFriend = async () => {
    const friends = await getFriendsOfUser(currentUser?.id as string);
    setIsFriend(friends.some((friend: User) => friend.id === id));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(id as string);
      setUser(user);
      await getIsFriend();
      setIsLoading(false);
      navigation.setOptions({
        title: "User Profile",
      });
    };
    fetchUser();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeScreen>
      <UserProfile
        isCurrentUser={false}
        user={user!}
        isFriend={isFriend}
        handleAddOrRemoveFriend={handleAddOrRemoveFriend}
        loadingButton={loadingButton}
      />
    </SafeScreen>
  );
}
