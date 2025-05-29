import { ThumbsDown, ThumbsUp } from "lucide-react";
import "./styles/GameOwnReview.css";

export default function GameOwnReview({ user, review }) {
  return (
    <div className="card rounded-0 w-100 border-0 min-vh-25 game-own-review">
      <div className="card-body game-review-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <img
              src={user.image}
              className="rounded-circle border border-light border-2 game-user-image"
              alt={user.name}
            />
            <span className="ms-3">{user.name}</span>
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
        <div className="card-body pt-3 px-4 pb-0">
          <span className="card-text">{review.text}</span>
        </div>
      </div>
    </div>
  );
}
