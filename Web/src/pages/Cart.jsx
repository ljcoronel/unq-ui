import React, { useEffect, useState } from 'react'
import '../styles/Cart.css'
import Api from '../services/Api'
import { getToken } from '../config/axios.config'
import CartGamesList from '../components/molecules/CartGamesList'
import CheckoutCart from '../components/molecules/CheckoutCart'

const Cart = () => {

  //const navigate = useNavigate();
  const [gamesOnCart,setGamesOnCart] = useState([]); //esto lo hago para que no me muestre una lista vacia si no hay juegos
  const [isEmptyCart,setIsEmptyCart] = useState(true)
  const token = getToken();

  useEffect(() => {
    Api.currentCart(token).then(res => setGamesOnCart(res.games));
  } ,[]);

  useEffect( () => {
    setIsEmptyCart(!gamesOnCart.length);
  },[gamesOnCart])
  

  return (
    <div className='cart-container'>
        <CartGamesList gamesOnCart = {gamesOnCart}  isEmptyCart = {isEmptyCart}/>
        <CheckoutCart isEmptyCart={isEmptyCart} games = {gamesOnCart} feesPorcentaje = {1} />
    </div>
      
  )
  
}

export default Cart
