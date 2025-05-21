import Button from "../atoms/button/Button";

const CheckoutCart = ({feesPorcentaje,gamesOnCart}) => {

    const total =  gamesOnCart.reduce( (res,game) => res + game.price.amount , 0 );
    
    const discountAmount = (total * feesPorcentaje /100);

    const totalWithDiscounts = total - discountAmount;

    return (
        !gamesOnCart.length?(
            <div className="cart-checkout-box">
                <span className="empty-checkout-message">Here you will see your cart total amount</span>
            </div>
         ) : (
            <div className="cart-checkout-box">
                <h3>Checkout</h3>
                <div className="checkout-cart-row"><span>Products ({gamesOnCart.length})</span><span>{`$ ${total.toFixed(2)}`}</span></div>
                <div className="checkout-cart-row"><span>Fees %{feesPorcentaje}</span><span>{`$ ${discountAmount.toFixed(2)}`}</span></div>
                <div className="checkout-cart-row checkout-total"><span>Total</span><span>{`$ ${totalWithDiscounts.toFixed(2)}`}</span></div>
                <Button variant="secondary">Buy</Button>
            </div>)
    )
}

export default CheckoutCart