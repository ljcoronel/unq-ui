import { useState } from "react";
import { FEES_PORCENTAJE } from "../constants";
import { useParams } from "react-router";
import PurchaseForm from "../components/molecules/PurchaseForm";

const Purchase = ({user}) => {
  const { total, cantProductos } = useParams();

  const discountAmount = (total * FEES_PORCENTAJE) / 100;

  const totalWithDiscounts = total - discountAmount;

  return (
    <section className="cart-container">
      <PurchaseForm userId={user.id} />
      <div className="cart-checkout-box">
        <h3>Checkout</h3>
        <div className="checkout-cart-row">
          <span>Products ({cantProductos})</span>
          <span>{`$ ${Number(total).toFixed(2)}`}</span>
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
    </section>
  );
};

export default Purchase;
