export default function GameReviewForm({ user }) {
  return (
    <div className="card p-4 fw-semibold" style={{ fontFamily: 'Inter', backgroundColor: '#898989', borderRadius: '8px', border: 'none', height: '365px', color: '#EDEDED' }}>
      <div className="d-flex align-items-center mb-3">
        <img
          src={user.image}
          className="rounded-circle"
          style={{ width: '50px', height: '50px', border: '2px solid #EDEDED' }}
          alt={user.name}
        />
        <span className="ms-3" style={{ fontSize: '22px', lineHeight: '28px' }}>{user.name}</span>
      </div>
      <form>
        <div className="mb-3 d-flex align-items-center">
          <label className="mb-0 me-3" style={{ fontSize: '22px', lineHeight: '28px' }}>Recommended</label>
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span role="img" aria-label="like">👍</span>
            <span role="img" aria-label="dislike">👎</span>
          </span>
        </div>
        <div className="mb-2">
          <label className="mb-1" style={{ fontSize: '22px', lineHeight: '28px' }}>Text</label>
        </div>
        <div className="mb-4">
          <textarea
            className="form-control"
            style={{ border: 'none', fontSize: '18px', lineHeight: '24px', minHeight: '90px' }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn"
            style={{ background: '#6E1D72', borderRadius: '6px', width: '172px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            <span className="fw-medium" style={{ fontSize: '20px', lineHeight: '28px' }}>Add review</span>
          </button>
        </div>
      </form>
    </div>
  );
}