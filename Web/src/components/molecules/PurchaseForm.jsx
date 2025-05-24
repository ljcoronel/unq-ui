import { useState } from "react"
import Input from "../atoms/input/Input";
import Button from "../atoms/button/Button";
import userService from "../../services/user"
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PurchaseForm = () => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiration, setCardExpiration] = useState('');
    const [cardCvv, setCardCvv] = useState('');

    const navigate = useNavigate();

    const handlePurchaseSubmit = (ev) => {
        ev.preventDefault();
        const body = {
            cardName,
            cardNumber,
            cardCvv,
            cardExpiration
        }

        userService.userPurchase(body)
            .then(res => {
                toast.success(res.message);
                navigate("/library");
            })
            .catch((error) => toast.error(`Purchase failed: ${error}`))
    }

    return (
        
            <form className="form-card" onSubmit={handlePurchaseSubmit}>
                <h2 className="card-title">Payment details</h2>
                <Input className='register-input-container'
                                    label = "CARD HOLDER NAME"  
                                    value = {cardName} 
                                    onChange={ev=>setCardName(ev.target.value)}
                                    required />
                <Input className='register-input-container'
                                    label = "NUMBER"  
                                    value = {cardNumber} 
                                    onChange={ev=>setCardNumber(ev.target.value)}
                                    required />
                <Input className='register-input-container'
                                    label = "CVV"  
                                    value = {cardCvv} 
                                    onChange={ev=>setCardCvv(ev.target.value)}
                                    required />
                <Input className='register-input-container'
                                    label = "EXPIRATION DATE"  
                                    placeholder="MM/YY"
                                    value = {cardExpiration} 
                                    onChange={ev=>setCardExpiration(ev.target.value)}
                                    required />
                <Button variant="secondary">Buy</Button>
            </form>
        
    )
}

export default PurchaseForm