import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import Api from '../services/Api'
import { getToken } from '../config/axios.config'
import CartGamesList from '../components/molecules/CartGamesList'
import CheckoutCart from '../components/molecules/CheckoutCart'

const Cart = () => {

  //const navigate = useNavigate();
  const [gamesOnCart,setGamesOnCart] = useState([]);
  const token = getToken();

  useEffect(() => {
    Api.currentCart(token).then(res => setGamesOnCart(res.games));
  } ,[]);


  return (
    <div className='cart-container'>
        <CartGamesList gamesOnCart = {gamesOnCart} />
        <CheckoutCart gamesOnCart = {gamesOnCart} feesPorcentaje = {1} />
    </div>
      
  )
  
}

export default Cart
