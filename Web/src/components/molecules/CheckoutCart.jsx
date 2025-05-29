import { useNavigate } from "react-router";
import Button from "../atoms/button/Button";
import { FEES_PORCENTAJE } from "../../constants";
import { formatCurrency } from "../../utils/money";

const CheckoutCart = ({ gamesOnCart }) => {
  const navigate = useNavigate();

  const total = gamesOnCart.reduce((res, game) => res + game.price.amount, 0);

  const feesAmount = (total * FEES_PORCENTAJE) / 100;

  const totalWithFees = +total + feesAmount;

  return !gamesOnCart.length ? (
    <div className="cart-checkout-box empty">
      <span className="empty-checkout-message">
        Here you will see your cart total amount
      </span>
    </div>
  ) : (
    <div className="cart-checkout-box">
      <h3>Checkout</h3>
      <div className="checkout-cart-row">
        <span>Products ({gamesOnCart.length})</span>
        <span>{formatCurrency(total)}</span>
      </div>
      <div className="checkout-cart-row">
        <span>Fees %{FEES_PORCENTAJE}</span>
        <span>{formatCurrency(feesAmount)}</span>
      </div>
      <div className="checkout-cart-row checkout-total">
        <span>Total</span>
        <span>{formatCurrency(totalWithFees)}</span>
      </div>
      <Button
        variant="secondary"
        onClick={() => navigate(`/purchase/${total}/${gamesOnCart.length}`)}
      >
        Buy
      </Button>
    </div>
  );
};

export default CheckoutCart;
