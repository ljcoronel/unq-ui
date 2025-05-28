
export default function GameOwnReview({ user, review }) {
  return (
    <div className="card rounded-0 w-100" style={{ backgroundColor: '#898989', border: 'none', minHeight: '100px' }}>
      <div className="card-body p-3 fw-semibold" style={{ fontFamily: 'Inter', fontSize: '22px', lineHeight: '28px', color: '#EDEDED' }}>
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <img
              src={user.image}
              className="rounded-circle"
              style={{ width: '53px', height: '53px', border: '1.5px solid #EDEDED' }}
              alt={user.name}
            />
            <span className="ms-3"> {user.name} </span>
          </div>
          <div>
            {review.isRecommended ? (
              <span role="img" aria-label="like">👍</span>
            ) : (
              <span role="img" aria-label="dislike">👎</span>
            )}
          </div>
        </div>
        <div className="card-body">
          <span className="card-text">{review.text}</span>
        </div>
      </div>
    </div>
  );
}
