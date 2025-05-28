export default function GameBuyCard({ game, onAddToCart }) {
  return (
    <div className="mt-4 w-100">
      <div
        className="card w-100"
        style={{ fontFamily: 'Inter', backgroundColor: '#898989', color: '#EDEDED', width: '1280px', height: '112px' }}
      >
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="h3 mb-0 fw-semibold" style={{ fontSize: '32px', lineHeight: '28px', color: '#EDEDED' }}>
            Buy {game.name}
          </div>
          <div className="d-flex align-items-center gap-5">
            <div className="h3 mb-0" style={{ fontWeight: 600, fontSize: '32px', lineHeight: '36px', color: '#EDEDED' }}>
              {game.price.currency}
              {Math.round(game.price.amount * 10 ** 2) / 10 ** 2}
            </div>
            <button
              className="btn fw-medium"
              style={{ fontSize: '20px', lineHeight: '28px', backgroundColor: '#7DC215', color: '#212121', width: '172px', height: '56px', borderRadius: '0' }}
              onClick={onAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}