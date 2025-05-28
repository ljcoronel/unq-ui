import { useEffect, useState } from "react";
import "../styles/Cart.css";
import userService from "../services/user";
import CartGamesList from "../components/molecules/CartGamesList";
import CheckoutCart from "../components/molecules/CheckoutCart";
import toast from "react-hot-toast";

const Cart = () => {
  const [gamesOnCart, setGamesOnCart] = useState([]);

  useEffect(() => {
    userService
      .currentCart()
      .then((res) => setGamesOnCart(res.games))
      .catch((error) => toast.error(`Register failed: ${error}`));
  }, []);

  return (
    <div className="cart-container">
      <CartGamesList gamesOnCart={gamesOnCart} />
      <CheckoutCart gamesOnCart={gamesOnCart} />
    </div>
  );
};

export default Cart;
