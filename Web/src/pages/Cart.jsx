import { useEffect, useState } from "react";
import "../styles/Cart.css";
import CartGamesList from "../components/molecules/CartGamesList";
import CheckoutCart from "../components/molecules/CheckoutCart";
import toast from "react-hot-toast";
import { currentCart } from "../services/user";

const Cart = () => {
  const [gamesOnCart, setGamesOnCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      currentCart()
      .then((res) => {
        setGamesOnCart(res.games);
        setLoading(false)})
      .catch((error) => toast.error(`Register failed: ${error}`));
  }, []);

  if(loading){
    return (<h1>Loading...</h1>)
  }  
  
  return (
    <section className="cart-container">
      <CartGamesList gamesOnCart={gamesOnCart} />
      <CheckoutCart gamesOnCart={gamesOnCart} />
    </section>
  );
};

export default Cart;
