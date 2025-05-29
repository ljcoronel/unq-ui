import "./ReviewCard.css";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Link } from "react-router";

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <img
        src={review.game.mainImage}
        alt={review.game.name}
        className="game-image"
      />
      <div className="review-content">
        <Link to={`/games/${review.game.id}`} className="game-title">
          {review.game.name.toUpperCase()}
        </Link>

        <p className="review-text">{review.text}</p>
      </div>
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
  );
};

export default ReviewCard;
