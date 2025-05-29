import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { addGameToCart, getGame } from "../services/game.js";
import GameHeader from "../components/molecules/Games/GameHeader.jsx";
import GameInfo from "../components/molecules/Games/GameInfo.jsx";
import GameBuyCard from "../components/molecules/Games/GameBuyCard.jsx";
import GameGallery from "../components/molecules/Games/GameGallery.jsx";
import GameDescription from "../components/molecules/Games/GameDescription.jsx";
import GameRequirements from "../components/molecules/Games/GameRequirements.jsx";
import GameRelatedSlider from "../components/molecules/Games/GameRelatedSlider.jsx";
import GameReviews from "../components/molecules/Games/GameReviews.jsx";

export default function Game({ isLoggedIn, user, fetchCurrentUser }) {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchGameById = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getGame(gameId);
      setGame(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchGameById();
  }, [gameId]);

  const handleAddGameToCart = (gameId) => {
    if (isLoggedIn) {
      addGameToCart(gameId);
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <section>
      <GameHeader image={game.mainImage} title={game.name} />
      <GameInfo game={game} />
      {!user?.games.some((game) => game.id === gameId) && (
        <GameBuyCard
          game={game}
          onAddToCart={() => handleAddGameToCart(gameId)}
        />
      )}
      <GameGallery multimedia={game.multimedia} name={game.name} />
      <GameDescription description={game.description} />
      <GameRequirements requirement={game.requirement} />
      <GameRelatedSlider relatedGames={game.relatedGames} />
      

      <GameReviews game={game} user={user} />
    </section>
  );
}
