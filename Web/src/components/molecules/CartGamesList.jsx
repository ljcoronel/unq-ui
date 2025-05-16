import EmptyCart from "./EmptyCart"
import GameOnCart from "./GameOnCart"

const CartGamesList = ({gamesOnCart, isEmptyCart}) => {
    
  
  return (
      isEmptyCart ? (
        <EmptyCart />
      ) : (
      <div className='cart-games-container'>
        {gamesOnCart.map(game => <GameOnCart key = {game.id} game = {game}/>)} 
      </div> ) 
    )
}

export default CartGamesList