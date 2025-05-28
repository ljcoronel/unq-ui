import * as game from "../../../services/game.js";
import {useEffect, useState} from "react";
import "./styles/GameReviewForm.css"
import {addReviewToGame} from "../../../services/game.js";

export default function GameReviewForm({ user, game}) {

  const [review, setReview] = useState({isRecommended: false});

  useEffect(() => {
    console.log(review)
  }, [review]);

  const addReview = () => {addReviewToGame(game.id, review)}

  return (
    <div className="card review-form-container text-light fw-semibold p-4" style={{background: '#6E1D72'}}>
      <div className="d-flex align-items-center mb-3">
        <img
          src={user.image}
          className="rounded-circle review-user-image me-3"
          alt={user.name}
        />
        <span className="review-user-name">{user.name}</span>
      </div>

      <form>
        <div className="mb-3 d-flex align-items-center" >
          <label className="mb-0 me-3" style={{ fontSize: '22px', lineHeight: '28px' }}>Recommended</label>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span role="img" aria-label="like" className={`${review.isRecommended  ? "active" : ""}`} onClick={() => setReview({...review, isRecommended: true})}>👍</span>
            <span role="img" aria-label="dislike" className={`${!review.isRecommended ? "active" : ""}`} onClick={() => setReview({...review, isRecommended: false})}>👎</span>
          </span>
        </div>

        <div className="mb-2">
          <label className="mb-1 review-label">Text</label>
        </div>

        <div className="mb-4">
          <textarea
              required={true}
            className="form-control"
            style={{ border: 'none', fontSize: '18px', lineHeight: '24px', minHeight: '90px' }}
            onChange={ (e) => setReview({...review, text: e.target.value})}
          />
        </div>

        <div className="d-flex justify-content-center">
          <button onClick={() => {addReview()}}
            className="btn"
            style={{ background: '#6E1D72', borderRadius: '6px', width: '172px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <span className="fw-medium" style={{ fontSize: '20px', lineHeight: '28px' }}>Add review</span>
          </button>
        </div>
      </form>
    </div>);

}
