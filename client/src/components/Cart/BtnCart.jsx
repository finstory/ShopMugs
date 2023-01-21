import React from "react";
import { useGlobalServices } from "../../services/useGlobalServices";

export const BtnCart = () => {
  const {
    global: {
      cart: { listCart, totalPrice },
    },
  } = useGlobalServices();
  return (
    <div className="btn-cart">
      <div className="total">TOTAL $ {totalPrice}</div>
      <div className="total clear">CLEAR ALL LIST</div>
      <div className="buy-all-cart">BUY ALL MUGS</div>
    </div>
  );
};
