import React, { useEffect } from "react";
import { useGlobalContext } from "../../../context/useGlobal";
import { useGlobalServices } from "../../../services/useGlobalServices";
import { ListOrders } from "./ListOrders";

export const Orders = () => {
  const {
    global: {
      orders: { isActive },
    },
    swtichModalOrder,
    getOrdersByUser,
  } = useGlobalServices();

  useEffect(() => {
    getOrdersByUser();
  }, []);

  if (isActive)
    return (
      <div className="orders-container">
        <div className="orders-card">
          <div className="close" onClick={() => swtichModalOrder(false)}>
            -
          </div>
          <div className="list-header">
            <div className="title">LIST ORDERS</div>
            <div className="section">
              <div className="section-box">CODE</div>
              <div className="section-box">ADRESS</div>
              <div className="section-box">STATUS</div>
              <div className="section-box">TOTAL</div>
              <div className="section-box">
                <div className="img-wrap-mug">
                  <img
                    src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1669078043/shop-mugs/navSvgs/mug_bktb1e.png"
                    alt="miniature mugs"
                  />
                </div>
              </div>
            </div>
          </div>
          <ListOrders />
        </div>
      </div>
    );
};
