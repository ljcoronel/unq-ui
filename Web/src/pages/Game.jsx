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
import GameOwnReview from "../components/molecules/Games/GameOwnReview.jsx";
import GameReviewForm from "../components/molecules/Games/GameReviewForm.jsx";
import GameReviews from "../components/molecules/Games/GameReviews.jsx";

export default function Game({ isLoggedIn, user }) {
  const navigate = useNavigate();
  const { gameId } = useParams();
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [error, setError] = useState("");

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
    <>
      <div className="container px-0" style={{ maxWidth: "1280px" }}>
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
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>RELATED GAMES</h5>
        </div>
        <GameRelatedSlider relatedGames={game.relatedGames} />
        <div
          className="mt-4 w-100 text-start fw-semibold"
          style={{ fontFamily: "Inter", fontSize: "22px", lineHeight: "28px" }}
        >
          <h5>REVIEWS</h5>
        </div>
        {user?.games.some((game) => game.id === gameId) &&
          (game.reviews.some((userReview) => userReview.user.id === user.id) ? (
            <GameOwnReview
              user={user}
              review={game.reviews.find(
                (review) => review?.user.id === user.id
              )}
            />
          ) : (
            <GameReviewForm user={user} game={game} />
          ))}

        <br />

        <GameReviews reviews={game.reviews} currentUserId={user?.id} />
      </div>
    </>
  );
}
