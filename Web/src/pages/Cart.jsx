import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import Api from '../services/Api'
import { getToken } from '../config/axios.config'
import GameOnCart from '../components/molecules/GameOnCart'

const Cart = () => {

  //const navigate = useNavigate();
  const [gamesOnCart,setGamesOnCart] = useState([]);
  const token = getToken();

  useEffect(() => {
    Api.currentCart(token).then(res => setGamesOnCart(res.games));
  } ,[]);

  return (
  
    <div className='cart-container'>
        <div className='cart-games-container'>
           {gamesOnCart.map(game => <GameOnCart key = {game.id} game = {game}/>)} 
        </div>
        <div className='cart-checkout-box'>checkout</div>
      </div>
  )
}

export default Cart
