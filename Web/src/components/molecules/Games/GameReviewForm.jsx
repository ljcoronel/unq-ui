import { useState } from "react";
import "./styles/GameReviewForm.css";
import { addReviewToGame } from "../../../services/game.js";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import Button from "../../atoms/button/Button.jsx";

export default function GameReviewForm({ user, game }) {
  const [review, setReview] = useState({ isRecommended: false });

  const addReview = () => {
    addReviewToGame(game.id, review);
  };

  return (
    <div className="card review-form-container text-light fw-semibold p-4">
      <div className="d-flex align-items-center mb-3">
        <img
          src={user.image}
          className="rounded-circle review-user-image me-3"
          alt={user.name}
        />
        <span className="review-user-name">{user.name}</span>
      </div>

      <form>
        <div className="mb-3 d-flex align-items-center">
          <label className="mb-0 me-3 review-label">Recommended</label>
          <span className="recommendation-toggle d-flex align-items-center gap-2">
            <div
              className={`review-icon is-recommended cursor-pointer ${review.isRecommended ? "selected" : ""}`}
              onClick={() => setReview({ ...review, isRecommended: true })}
            >
              <ThumbsUp size={20} />
            </div>
            <div
              className={`review-icon not-recommended cursor-pointer ${!review.isRecommended ? "selected" : ""}`}
              onClick={() => setReview({ ...review, isRecommended: false })}
            >
              <ThumbsDown size={20} />
            </div>
          </span>
        </div>

        <div className="mb-2">
          <label className="mb-1 review-label">Text</label>
        </div>

        <div className="mb-4">
          <textarea
            required
            placeholder="Add a comment"
            className="form-control review-textarea"
            onChange={(e) => setReview({ ...review, text: e.target.value })}
          />
        </div>

        <div className="d-flex justify-content-center">
          <Button
            onClick={addReview}
          >
            <span className="fw-medium review-button-text">Add review</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
