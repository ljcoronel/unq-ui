import { formatCurrency } from "../../utils/money";

const GameOnCart = ({ game }) => {
  return (
    <div className="game-on-cart-container">
      <img className="cart-game-image" src={game.mainImage}></img>
      <div className="cart-game-name-container">{game.name.toUpperCase()}</div>
      <div className="cart-game-price-container">
        <span>{game.price.currency}</span>
        <span>{formatCurrency(game.price.amount)}</span>
      </div>
    </div>
  );
};

export default GameOnCart;
