import React from "react";
import "./UserReviews.css";
import ReviewCard from "../../../molecules/ReviewCard/ReviewCard";

export default function UserReviews({  user }) {
  const reviews = user?.reviews || [];
  return (
    <div className="user-reviews">
      <h2 className="section-title">REVIEWS</h2>
      <div className="user-reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => <ReviewCard review={review} key={review.id} />)
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}
