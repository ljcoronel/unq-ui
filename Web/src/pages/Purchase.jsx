import { useState } from "react";
import { FEES_PORCENTAJE } from "../constants";
import { useParams } from "react-router";
import PurchaseForm from "../components/molecules/PurchaseForm";

const Purchase = () => {
  const { total, cantProductos } = useParams();

  const discountAmount = (total * FEES_PORCENTAJE) / 100;

  const totalWithDiscounts = total - discountAmount;

  return (
    <div className="cart-container">
      <PurchaseForm />
      <div className="cart-checkout-box">
        <h3>Checkout</h3>
        <div className="checkout-cart-row">
          <span>Products ({cantProductos})</span>
          <span>{`$ ${total}`}</span>
        </div>
        <div className="checkout-cart-row">
          <span>Fees %{FEES_PORCENTAJE}</span>
          <span>{`$ ${discountAmount.toFixed(2)}`}</span>
        </div>
        <div className="checkout-cart-row checkout-total">
          <span>Total</span>
          <span>{`$ ${totalWithDiscounts.toFixed(2)}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
