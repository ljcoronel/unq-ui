import React from 'react';
import { Link } from 'react-router-dom';
import './styles/GameReviews.css';

export default function GameReviews({ reviews, currentUserId }) {
  return (
    <div className="game-reviews-grid">
      {reviews
        .filter((review) => review.user.id !== currentUserId)
        .map((review) => (
          <div key={review.id} className="card game-review-card">
            <div className="d-flex justify-content-between align-items-start">
              <Link to={`/users/${review.user.id}`} className="d-flex align-items-center text-decoration-none">
                <img
                  src={review.user.image}
                  className="rounded-circle game-review-user-img"
                  alt={review.user.name}
                />
                <span className="game-review-user-name">{review.user.name}</span>
              </Link>
              <div>
                {review.isRecommended ? (
                  <span role="img" aria-label="like">👍</span>
                ) : (
                  <span role="img" aria-label="dislike">👎</span>
                )}
              </div>
            </div>
            <div className="card-body game-review-body">
              <span className="card-text">{review.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
