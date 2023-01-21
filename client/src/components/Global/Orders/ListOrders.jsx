import React, { useEffect, useState } from "react";
import { useImageTools } from "../../../hooks/useImageTools";
import { useNav } from "../../../hooks/useNav";
import { useGlobalServices } from "../../../services/useGlobalServices";

export const ListOrders = () => {
  const {
    global: {
      orders: { listOrders },
    },
    swtichModalOrder,
    switchScrollManager,
  } = useGlobalServices();
  const { reSizeImage } = useImageTools();
  const [listActive, setListActive] = useState([]);
  const { goDetails } = useNav();

  const switchListActive = (id) => {
    setListActive({ ...listActive, [id]: !listActive[id] });
  };

  useEffect(() => {
    let listResult = {};

    if (listOrders) {
      for (let i = 0; i < listOrders.length; i++)
        listResult = { ...listResult, [listOrders[i].id]: false };
      setListActive(listResult);
    }
  }, [listOrders]);

  useEffect(() => {
    return () => switchScrollManager(false, "details");
  }, []);

  return (
    <div className="list-body">
      {listOrders &&
        listOrders.map((order) => {
          if (order.address.length > 13)
            order.address = order.address.slice(0, 33) + "...";

          return (
            <div className="wrap" key={order.id}>
              <div className="section">
                <div className="section-box"># {order.code} </div>
                <div className="section-box">{order.address.toUpperCase()}</div>
                <div className="section-box">{order.status.toUpperCase()}</div>
                <div className="section-box">
                  $ {order.total_price.toFixed(2)} US
                </div>
                <div className="section-box">
                  <div
                    className="img-wrap-arrow"
                    onClick={() => switchListActive(order.id)}
                  >
                    <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1669078726/shop-mugs/navSvgs/arrow_down_n9cpyo.png" />
                  </div>
                </div>
              </div>

              {listActive[order.id] &&
                order.cart.map((item) => {
                  let name = item.name;
                  if (item.name.length > 33)
                    name = item.name.slice(0, 33) + "...";
                    console.log(item)
                  return (
                    <div
                      className="section"
                      key={item.id}
                      style={{ backgroundColor: "#564f5fd5" }}
                    >
                      <div className="section-box">
                        <div className="img-wrap-miniautre">
                          <img
                            src={reSizeImage(item.image, 110)}
                            alt="miniature mugs"
                          />
                        </div>
                      </div>
                      <div className="section-box">{name.toUpperCase()}</div>
                      <div className="section-box">X {item.amount}</div>
                      <div className="section-box">
                        $ {item.price.toFixed(2)} US
                      </div>
                      <div className="section-box">
                        <div
                          className="img-wrap-eyes"
                          onClick={() => {
                            goDetails(item.id);
                            swtichModalOrder(false);
                            switchScrollManager(true, "details");
                          }}
                        >
                          <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1667127016/shop-mugs/navSvgs/Eye_open_font_awesome.svg_vwzxuj.png" />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
