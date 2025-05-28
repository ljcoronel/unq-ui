import './GameReviewForm.css';
import Button from '../../atoms/Button/Button.jsx';
export default function GameReviewForm({ user }) {
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
          <span className="d-inline-flex align-items-center">
            <span role="img" aria-label="like">👍</span>
            <span role="img" aria-label="dislike" className="ms-2">👎</span>
          </span>
        </div>

        <div className="mb-2">
          <label className="mb-1 review-label">Text</label>
        </div>

        <div className="mb-4">
          <textarea className="form-control review-textarea" />
        </div>

        <div className="d-flex justify-content-center">
          <Button>
            Add review
          </Button>
        </div>
      </form>
    </div>
  );
}
