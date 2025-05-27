import "./GameCard.css";
import { formatCurrency } from "../../../utils/money";
import { Link } from "react-router";

export default function GameCard({ game, format = "row", withPrice = true }) {
  return (
    <div className={`game-card-${format}`}>
      <img src={game.mainImage} alt={game.name} className="game-image" />
      <div className="game-details">
        <Link to={`/games/${game.id}`} className="game-title">
          {game.name}
        </Link>
        <div className="game-tags">
          {game.tags.slice(0, 10).map((tag) => (
            <Link
              to={`/tags/${tag.id}?tagName=${tag.name}`}
              key={tag.id}
              className="game-tag"
            >
              {tag.name}
            </Link>
          ))}
        </div>
      </div>
      {withPrice && (
        <div className="game-price">
          <span>{game.price.currency}</span>
          <span>{formatCurrency(game.price.amount, 2)}</span>
        </div>
      )}
    </div>
  );
}
