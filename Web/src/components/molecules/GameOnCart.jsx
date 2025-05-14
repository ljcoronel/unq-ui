import { useParams } from "react-router";

const GameOnCart = ({game}) => {

    return (
        <div className="game-on-cart-container">
            
            <img className="cart-game-image" src={game.mainImage}></img>
            <div className="cart-game-name-container">{game.name.toUpperCase()}</div>
            <div className="cart-game-price-container">
                <span>{game.price.currency}</span>
                <span>{game.price.amount.toFixed(2)}</span>
            </div>
        </div>
    )
}


export default GameOnCart