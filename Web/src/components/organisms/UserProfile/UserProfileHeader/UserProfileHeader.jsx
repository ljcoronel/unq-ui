import { useEffect, useState } from "react";
import "./UserProfileHeader.css";
import Button from "../../../atoms/button/Button";
import { removeToken } from "../../../../config/axios.config";
import { getFriendsOfUser } from "../../../../services/user";
import { useNavigate, useNavigation, useRoutes } from "react-router";
import toast from "react-hot-toast";

export default function UserProfileHeader({
  currentUser,
  user,
  setIsLoggedIn,
}) {
  const isLoggedUser = currentUser?.id === user?.id;
  const actualUser = isLoggedUser ? currentUser : user;
  const [isFriend, setIsFriend] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleAddOrRemoveFriend = async (userId) => {
    try {
      await addOrRemoveFriend(userId);
      await getIsFriend();
      toast.success(
        isFriend ? "Friend removed successfully!" : "Friend added successfully!"
      );
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error(
        isFriend
          ? "Error removing friend. Please try again."
          : "Error adding friend. Please try again."
      );
    }
  };

  const getIsFriend = async () => {
    const friends = await getFriendsOfUser(currentUser.id);
    setIsFriend(friends.some((friend) => friend.id === actualUser.id));
  };

  useEffect(() => {
    if (!isLoggedUser && !!actualUser) {
      getIsFriend();
    }
  }, [user]);

  return (
    <div className="user-profile-header">
      <div className="user-profile-info">
        <img
          className="user-avatar"
          src={actualUser?.image}
          alt={actualUser?.name}
        />
        <p className="user-name">{actualUser?.name}</p>
      </div>
      <Button
        className="user-profile-button"
        onClick={() => {
          isLoggedUser ? logout() : handleAddOrRemoveFriend(actualUser.id);
        }}
      >
        {isLoggedUser ? "Logout" : isFriend ? "Remove Friend" : "Add Friend"}
      </Button>
    </div>
  );
}
