import { useAuth } from "../../context/AuthContext";
import SafeScreen from "@/components/SafeScreen";
import UserProfile from "@/components/UserProfile";
import Loading from "@/components/Loading";

export default function ProfileScreen() {
  const { user } = useAuth();

  if (!user) {
    return <Loading />;
  }

  return (
    <SafeScreen>
      <UserProfile
        isCurrentUser={true}
        user={user!}
        isFriend={false}
        handleAddOrRemoveFriend={() => {}}
      />
    </SafeScreen>
  );
}
