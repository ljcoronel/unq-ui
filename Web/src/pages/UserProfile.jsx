import React, { useEffect, useState } from "react";
import UserProfileHeader from "../components/organisms/UserProfile/UserProfileHeader/UserProfileHeader";
import UserReviews from "../components/organisms/UserProfile/UserReviews/UserReviews";
import Api from "../services/user";
import { useParams } from "react-router";
import "../styles/UserProfile.css";
import UserGames from "../components/organisms/UserProfile/UserGames/UserGames";

export default function UserProfile({ currentUser, setIsLoggedIn }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const userFounded = await Api.getUserById(userId);
    setUser(userFounded);
  }

  useEffect(() => {
    fetchUser();
  }, [userId]);

  return (
    <section className="user-profile">
      <UserProfileHeader currentUser={currentUser} user={user} setIsLoggedIn={setIsLoggedIn} />
      {currentUser && user && currentUser.id === user.id ? (
        <UserGames currentUser={currentUser} />
      ) : (
        <UserReviews user={user} />
      )}
    </section>
  );
}
