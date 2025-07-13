import { useState } from "react";
import Input from "../atoms/input/Input";
import Button from "../atoms/button/Button";
import { userPurchase } from "../../services/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const PurchaseForm = ({userId}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const navigate = useNavigate();

  const handlePurchaseSubmit = (ev) => {
    ev.preventDefault();
    const body = {
      cardName,
      cardNumber,
      cardCvv,
      cardExpiration,
    };

    
      userPurchase(body)
      .then((res) => {
        toast.success(res.message);
        navigate(`/users/${userId}`);
      })
      .catch((error) => toast.error(`Purchase failed: ${error}`));
  };

  return (
    <form className="form-card" onSubmit={handlePurchaseSubmit}>
      <h2 className="card-title">Payment details</h2>
      <Input
        className="register-input-container"
        label="CARD HOLDER NAME"
        placeholder="Name"
        value={cardName}
        onChange={(ev) => setCardName(ev.target.value)}
        required
      />
      <Input
        className="register-input-container"
        label="NUMBER"
        placeholder="16 digits"
        value={cardNumber}
        onChange={(ev) => setCardNumber(ev.target.value)}
        required
      />
      <Input
        className="register-input-container"
        label="CVV"
        placeholder="3 digits"
        value={cardCvv}
        onChange={(ev) => setCardCvv(ev.target.value)}
        required
      />
      <Input
        className="register-input-container"
        label="EXPIRATION DATE"
        placeholder="MM/YY"
        value={cardExpiration}
        onChange={(ev) => setCardExpiration(ev.target.value)}
        required
      />
      <Button variant="secondary">Buy</Button>
    </form>
  );
};

export default PurchaseForm;
