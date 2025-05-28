import React, { useEffect, useState } from "react";
import "./UserProfileHeader.css";
import Button from "../../../atoms/button/Button";
import { removeToken } from "../../../../config/axios.config";
import Api from "../../../../services/user";
import { useNavigate, useNavigation, useRoutes } from "react-router";

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

  const addOrRemoveFriend = async (userId) => {
    try {
      await Api.addOrRemoveFriend(userId);
      console.log("Friend added o removed successfully");
      await getIsFriend();
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const getIsFriend = async () => {
    const friends = await Api.getFriendsOfUser(currentUser.id);
    setIsFriend(friends.some((friend) => friend.id === actualUser.id));
  };

  useEffect(() => {
    if (!isLoggedUser) {
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
          isLoggedUser ? logout() : addOrRemoveFriend(actualUser.id);
        }}
      >
        {isLoggedUser ? "Logout" : isFriend ? "Remove Friend" : "Add Friend"}
      </Button>
    </div>
  );
}
