export default function GameOwnReview({ user, review }) {
  return (
    <div className="card rounded-0 w-100 bg-secondary border-0 min-vh-25">
      <div className="card-body p-3 fw-semibold text-light fs-5 lh-base">
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <img
              src={user.image}
              className="rounded-circle border border-light border-2"
              style={{ width: '53px', height: '53px' }}
              alt={user.name}
            />
            <span className="ms-3">{user.name}</span>
          </div>
          <div>
            {review.isRecommended ? (
              <span role="img" aria-label="like">👍</span>
            ) : (
              <span role="img" aria-label="dislike">👎</span>
            )}
          </div>
        </div>
        <div className="card-body py-2 px-0">
          <span className="card-text">{review.text}</span>
        </div>
      </div>
    </div>
  );
}
