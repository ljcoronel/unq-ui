import { useState } from "react";
import { FEES_PORCENTAJE } from "../constants";
import { useParams } from "react-router";
import PurchaseForm from "../components/molecules/PurchaseForm";
import { formatCurrency } from "../utils/money";

const Purchase = ({user}) => {
  const { total, cantProductos } = useParams();

  const feesAmount = (total * FEES_PORCENTAJE) / 100;

  const totalWithFees = +total + feesAmount;

  return (
    <section className="cart-container">
      <PurchaseForm userId={user.id} />
      <div className="cart-checkout-box">
        <h3>Checkout</h3>
        <div className="checkout-cart-row">
          <span>Products ({cantProductos})</span>
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
      </div>
    </section>
  );
};

export default Purchase;
