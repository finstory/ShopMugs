import React, { useEffect, useState } from "react";
import { useDetailsContext } from "../../context/useDetalis";
import { useGlobalContext } from "../../context/useGlobal";
import { useGlobalServices } from "../../services/useGlobalServices";

export const ListCart = () => {
  const {
    getAllCartByUserId,
    editAmountItemInCart,
    deleteItemInCart,
    addItemInCart,
    global: {
      cart: { listCart, totalPrice },
    },
  } = useGlobalServices();

  const { global, setGlobal } = useGlobalContext();
  const { details, setDetails } = useDetailsContext();
  const [cardsEmpty, setCardsEmpty] = useState([]);

  const colorType = (type) => {
    switch (type) {
      case "magic":
        return "type-magic";
      case "limited":
        return "type-limited";
      case "moon":
        return "type-moon";
      default:
        return "type-normal";
    }
  };

  const disabledProfile = () => {
    if (listCart && listCart.length > 0) return "";
    return "disabled-color-profile";
  };

  const updateAmount = (idItem, itemAmount, value) => {
    if (value === -1 && itemAmount <= 1) return;
    if (value === 1 && itemAmount >= 9) return;
    editAmountItemInCart(idItem, itemAmount + value);
  };

  const reSizeImage = (url, weigth) => {
    let newUrl = "";
    const list = url.split("/upload/");

    for (let i = 0; i < list.length; i++)
      if (i === 0) newUrl = list[i] + `/upload/w_${weigth},f_auto/`;
      else newUrl += list[i];

    return newUrl;
  };

  const renderCardEmpty = () => {
    const listRender = [];
    let amount = 0;
    if (listCart.length === 0) amount = 3;
    if (listCart.length === 1) amount = 2;
    if (listCart.length === 2) amount = 1;
    for (let i = 0; i < amount; i++) {
      listRender.push(
        <div
          key={i + 9909}
          className="product-box"
          style={{
            backgroundColor: "#1e19254f",
          }}
        >
          <div className="left-wrap">
            <div
              className="img-wrap"
              style={{
                backgroundColor: "#dbd6e015",
                cursor: "default",
                borderRadius: "1rem",
                padding: ".6rem 0",
                width: "4.5rem",
                height: "3rem",
              }}
            ></div>
          </div>
          <div className="right-wrap">
            <div className="box">
              <p
                style={{
                  backgroundColor: "#dbd6e015",
                  borderRadius: "1rem",
                  padding: ".7rem 0",
                  margin: "0 1rem",
                  width: "80%",
                }}
              ></p>
            </div>
            <div className="box">
              <p
                style={{
                  backgroundColor: "#dbd6e015",
                  borderRadius: "1rem",
                  padding: ".7rem 0",
                  margin: "0 1rem",
                  width: "80%",
                }}
              ></p>
            </div>
          </div>
        </div>
      );
    }
    setCardsEmpty(listRender);
  };

  const [itemSelection, setItemSelection] = useState([]);

  const setItemSelecedInRedux = (idItem) => {
    setGlobal({ cart: { ...global.cart, itemSelected: idItem } });
  };

  const SelectorItems = (idItem ) => {
    let listResult = [];
    console.log(listCart)
    listResult = listCart.map((item, i) => {
      if (item.id === idItem) {
        return { ...item, isSelected: true };
      } else if (idItem === 0 && listCart.length - 1 === i) {
        setItemSelecedInRedux(item.id);
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });

    setItemSelection(listResult);
    idItem && setItemSelecedInRedux(idItem);
  };

  const styleSelector = (idItem) => {
    const itemFilter = itemSelection.filter(
      (item) => item.id === idItem && item.isSelected === true
    );
    if (itemFilter.length) return true;
    else return false;
  };
  const listItemIdLength = listCart ? listCart.length : 0;
  useEffect(() => {
    listCart.length && SelectorItems(listCart[0].id);
  }, [JSON.stringify(listItemIdLength)]);

  useEffect(() => {
    renderCardEmpty();
  }, [JSON.stringify(listCart)]);

  if (itemSelection)
    return (
      <div className="slide-cart-box anim-showing">
        {/* <button onClick={() => addItemInCart(32)}>Add</button> */}
        <div className="list-cart-container">
          {/* <div className="list-cart-mask"></div> */}
          <div className="list-cart">
            {listCart && listCart.length > 0 ? (
              listCart.map((item, i) => (
                <div
                  key={item.id}
                  className="product-box"
                  style={{
                    backgroundColor: styleSelector(item.id) ? "#80748bab" : "",
                  }}
                  onClick={() => SelectorItems(item.id)}
                >
                  <div className="left-wrap">
                    <div className="img-wrap">
                      <div className={`type ${colorType(item.type)}`}>
                        <p>{item.type.toUpperCase()}</p>
                      </div>
                      <img
                        src={reSizeImage(item.wallpaper, 250)}
                        alt={item.name}
                      />
                    </div>
                  </div>
                  <div className="right-wrap">
                    <div className="box">
                      <p>
                        {item.name.slice(0, 11).toUpperCase()}
                        {item.name.length > 11 ? "..." : ""}
                      </p>
                    </div>
                    <div className="box">
                      <p>X {item.amount}</p>
                      <div className="panel">
                        <div
                          className="btn-panel"
                          onClick={() => updateAmount(item.id, item.amount, -1)}
                        >
                          <img
                            src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1667127829/shop-mugs/navSvgs/menos_q61nzc.png"
                            alt=""
                          />
                        </div>
                        <div
                          className="btn-panel"
                          onClick={() => updateAmount(item.id, item.amount, 1)}
                        >
                          <img
                            src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1667127768/shop-mugs/navSvgs/mas_uvqcdg.png"
                            alt=""
                          />
                        </div>
                        <div
                          className="btn-panel"
                          onClick={() => {
                            deleteItemInCart(item.id);
                          }}
                        >
                          <img
                            src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1667128328/shop-mugs/navSvgs/delete-icon_rfiprx.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="cart-empty">
                <p>YOUR CART IS EMPTY !</p>
              </div>
            )}

            {cardsEmpty}

            {/* {cardsEmpty.map((card) => (
            <div
              key={card}
              className="product-box"
              style={{
                backgroundColor: "#1e19254f",
              }}
            >
              <div className="left-wrap">
                <div
                  className="img-wrap"
                  style={{
                    backgroundColor: "#dbd6e015",
                    cursor: "default",
                    borderRadius: "1rem",
                    padding: ".6rem 0",
                    width: "4.5rem",
                    height: "3rem",
                  }}
                ></div>
              </div>
              <div className="right-wrap">
                <div className="box">
                  <p
                    style={{
                      backgroundColor: "#dbd6e015",
                      borderRadius: "1rem",
                      padding: ".7rem 0",
                      margin: "0 1rem",
                      width: "80%",
                    }}
                  ></p>
                </div>
                <div className="box">
                  <p
                    style={{
                      backgroundColor: "#dbd6e015",
                      borderRadius: "1rem",
                      padding: ".7rem 0",
                      margin: "0 1rem",
                      width: "80%",
                    }}
                  ></p>
                </div>
              </div>
            </div>
          ))} */}
          </div>
        </div>
      </div>
    );
};
