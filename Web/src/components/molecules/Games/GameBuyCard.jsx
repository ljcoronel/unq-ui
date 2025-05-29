import Button from "../../atoms/button/Button";
import "./styles/GameBuyCard.css";

export default function GameBuyCard({ game, onAddToCart }) {
  return (
    <div className="mt-4 w-100">
      <div className="card w-100 game-buy-card">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div className="h3 mb-0 game-buy-title">Buy {game.name}</div>
          <div className="d-flex align-items-center gap-5">
            <div className="h3 mb-0 game-buy-price">
              {game.price.currency}
              {Math.round(game.price.amount * 100) / 100}
            </div>
            <Button
              variant="secondary"
              onClick={onAddToCart}
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
