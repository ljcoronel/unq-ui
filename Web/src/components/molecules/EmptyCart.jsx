import Button from "../atoms/button/Button"

const EmptyCart = () => {

    return (
        <div className="empty-cart-container">
            <img src="/shopBasket.png" alt="logoDeCanasta" className="shop-basket-img" />
            <h1 className="empty-cart-legend">Start by adding a game!</h1>
            <Button variant="secondary">Add games</Button>
        </div>
    )
}

export default EmptyCart