import React from 'react';
import { Link } from 'react-router-dom';

export default function GameReviews({ reviews, currentUserId }) {
  return (
    <div className="d-grid gap-5 fw-semibold" style={{ gridTemplateColumns: '1fr 1fr', fontFamily: 'Inter', fontSize: '22px', lineHeight: '28px' }}>
      {reviews
        .filter((review) => review.user.id !== currentUserId)
        .map((review) => (
          <div key={review.id} className="card rounded-0 p-3" style={{ width: '607px', height: '157px', background: '#898989', border: 'none' }}>
            <div className="d-flex justify-content-between align-items-start">
              <Link to={`/users/${review.user.id}`} className="d-flex align-items-center text-decoration-none">
                <img
                  src={review.user.image}
                  className="rounded-circle"
                  style={{ width: '53px', height: '53px', border: '1.5px solid #EDEDED' }}
                  alt={review.user.name}
                />
                <span className="ms-3" style={{ color: '#EDEDED' }}>{review.user.name}</span>
              </Link>
              <div>
                {review.isRecommended ? (
                  <span role="img" aria-label="like">👍</span>
                ) : (
                  <span role="img" aria-label="dislike">👎</span>
                )}
              </div>
            </div>
            <div className="card-body" style={{ color: '#EDEDED' }}>
              <span className="card-text">{review.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
}
