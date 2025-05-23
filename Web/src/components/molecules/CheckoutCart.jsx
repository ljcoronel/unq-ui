import { useNavigate, useParams } from "react-router";
import Button from "../atoms/button/Button";
import { FEES_PORCENTAJE } from "../../constants";

const CheckoutCart = ({gamesOnCart}) => {

    const navigate =  useNavigate();

    const total =  gamesOnCart.reduce( (res,game) => res + game.price.amount , 0 ).toFixed(2);
    
    const discountAmount = (total * FEES_PORCENTAJE /100);

    const totalWithDiscounts = total - discountAmount;

    return (
        !gamesOnCart.length?(
            <div className="cart-checkout-box">
                <span className="empty-checkout-message">Here you will see your cart total amount</span>
            </div>
         ) : (
            <div className="cart-checkout-box">
                <h3>Checkout</h3>
                <div className="checkout-cart-row"><span>Products ({gamesOnCart.length})</span><span>{`$ ${total}`}</span></div>
                <div className="checkout-cart-row"><span>Fees %{FEES_PORCENTAJE}</span><span>{`$ ${discountAmount.toFixed(2)}`}</span></div>
                <div className="checkout-cart-row checkout-total"><span>Total</span><span>{`$ ${totalWithDiscounts.toFixed(2)}`}</span></div>
                <Button variant="secondary" onClick={()=>navigate(`/purchase/${total}/${gamesOnCart.length}`)} >Buy</Button>
            </div>)
    )
}

export default CheckoutCart