import { useNavigate } from "react-router";
import Button from "../atoms/button/Button";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="empty-cart-container">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img
          src="/shopBasket.png"
          alt="logoDeCanasta"
          className="shop-basket-img"
        />
        <h1 className="empty-cart-legend">Start by adding a game!</h1>
      </div>
      <Button variant="secondary" onClick={() => navigate("/")} className="empty-cart-button">
        Add games
      </Button>
    </div>
  );
};

export default EmptyCart;
