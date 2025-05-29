import { Link } from "react-router-dom";
import "./styles/GameReviews.css";
import GameOwnReview from "./GameOwnReview";
import GameReviewForm from "./GameReviewForm";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function GameReviews({ game, user }) {
  return (
    <div className="game-reviews-container">
      <h5 className="fw-semibold mb-3">REVIEWS</h5>
      {user?.games.some((userGame) => userGame.id === game.id) &&
        (game.reviews.some((userReview) => userReview.user.id === user.id) ? (
          <GameOwnReview
            user={user}
            review={game.reviews.find((review) => review?.user.id === user.id)}
          />
        ) : (
          <GameReviewForm user={user} game={game} />
        ))}
      <div className="game-reviews-grid mt-4">
        {game.reviews
          .filter((review) => review.user.id !== user?.id)
          .map((review) => (
            <div key={review.id} className="card game-review-card">
              <div className="d-flex justify-content-between align-items-start">
                <Link
                  to={`/users/${review.user.id}`}
                  className="d-flex align-items-center text-decoration-none"
                >
                  <img
                    src={review.user.image}
                    className="rounded-circle game-review-user-img"
                    alt={review.user.name}
                  />
                  <span className="game-review-user-name">
                    {review.user.name}
                  </span>
                </Link>
                <div
                  className={`review-icon ${review.isRecommended ? "is-recommended" : "not-recommended"}`}
                >
                  {review.isRecommended ? (
                    <ThumbsUp size={20} />
                  ) : (
                    <ThumbsDown size={20} />
                  )}
                </div>
              </div>
              <div className="card-body pt-4 px-3 pb-0 game-review-text">
                <span className="card-text">{review.text}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
