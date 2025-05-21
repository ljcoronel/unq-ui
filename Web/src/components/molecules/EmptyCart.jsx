import { useNavigate } from "react-router"
import Button from "../atoms/button/Button"

const EmptyCart = () => {

    const navigate =  useNavigate();

    return (
        <div className="empty-cart-container">
            <img src="/shopBasket.png" alt="logoDeCanasta" className="shop-basket-img" />
            <h1 className="empty-cart-legend">Start by adding a game!</h1>
            <Button variant="secondary" onClick = {()=>navigate("/")} >Add games</Button>
        </div>
    )
}

export default EmptyCart