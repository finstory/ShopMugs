import React, { useEffect, useRef, useState } from "react";
import { useDetailsContext } from "../../context/useDetalis";
import { useImageTools } from "../../hooks/useImageTools";
import { useManagerText } from "../../hooks/useManagerText";
import { useNav } from "../../hooks/useNav";
import { useDetailsServices } from "../../services/useDetailsServices";
import { useGlobalServices } from "../../services/useGlobalServices";
import { ListCart } from "../Cart/ListCart";
import { ImageFullSize } from "./ImageFullSize";
export const CardDetails = ({ mugFromCart }) => {
  const {
    getItemById,
    setUrlToViewFullSize,
    activeViewFullSize,
    details: { item, renderInCart },
    idParam,
  } = useDetailsServices();
  const {
    addItemInFavorites,
    deleteItemInFavorites,
    itemExistsInFavorites,
    editAmountItemInCart,
    deleteItemInCart,
    addItemInCart,
    switchScrollManager,
    global: {
      scrollManager: { goDetails },
      favorites: { listItemId },
      cart: { itemSelected, listCart },
    },
  } = useGlobalServices();

  const { reSizeImage } = useImageTools();
  const { goHome } = useNav();
  const { allFirstUpperCase } = useManagerText();

  const mug = mugFromCart || item;
  const [amount, setAmount] = useState(1);
  const [mugTemp, setMugTemp] = useState(false);

  useEffect(() => {
    if (mugFromCart) setAmount(mug.amount || 1);
  }, [mugFromCart]);

  const updateAmountInRedux = (idItem, itemAmount, value) => {
    if (value === -1 && itemAmount <= 1) return;
    if (value === 1 && itemAmount >= 9) return;
    editAmountItemInCart(idItem, itemAmount + value);
  };

  const updateAmount = (value) => {
    if (amount + value < 1 || amount + value > 9) return;
    setAmount(amount + value);
  };

  const switchItemInFav = () => {
    itemExistsInFavorites(mug.id)
      ? deleteItemInFavorites(mug.id)
      : addItemInFavorites(mug.id);
  };

  const colorType = (type) => {
    switch (type) {
      case "limited":
        return "type-limited";
      case "magic":
        return "type-magic";
      case "moon":
        return "type-moon";
      default:
        return "type-normal";
    }
  };
  const refDetails = useRef();

  useEffect(() => {
    mugTemp
      ? setUrlToViewFullSize(mug.image)
      : mug.image_cold
      ? setUrlToViewFullSize(mug.image_cold)
      : setUrlToViewFullSize(
          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1668567500/shop-mugs/items/Edition%20Limited/cloudAndHot/mug_cold_magic_v5m7ye.png"
        );
  }, [mugTemp, mug.image]);

  useEffect(() => {
    const scrollY = window.scrollY;
    if (goDetails)
      for (let i = scrollY; i < refDetails.current.clientHeight; i++) {
        setTimeout(() => {
          window.scrollTo(0, i);
        }, i);
      }
    return () => {
      switchScrollManager(false, "details");
    };
  }, [goDetails]);

  useEffect(() => {
    idParam && getItemById();
    setTimeout(() => {
      setMugTemp(true);
    }, 1100);
  }, [JSON.stringify(itemSelected), idParam]);

  useEffect(() => {
    mug.type === "magic" || mug.type === "limited"
      ? setMugTemp(false)
      : setMugTemp(true);
  }, [mug.id]);

  return (
    <>
      <div className="card-details" ref={refDetails}>
        {mug && mug.image && (
          <>
            <div
              className="card-details-box"
              style={
                renderInCart && !listCart.length
                  ? { opacity: 0, pointerEvents: "none" }
                  : {}
              }
            >
              <p className="title">{allFirstUpperCase(mug.name)}</p>
              <p className="sub-title">{allFirstUpperCase(mug.sub_name)}</p>
              <div className="btn-aditional">
                <div className={`favorites`} onClick={switchItemInFav}>
                  <img
                    src={
                      itemExistsInFavorites(mug.id)
                        ? "https://res.cloudinary.com/dz9smi3nc/image/upload/w_100/v1668529162/shop-mugs/navSvgs/heart-dark_mdts8m.png"
                        : "https://res.cloudinary.com/dz9smi3nc/image/upload/w_100/v1667871437/shop-mugs/navSvgs/heart-black_igs4gs.png"
                    }
                    alt="add favorites"
                    className={
                      itemExistsInFavorites(mug.id)
                        ? "card-btn-favorites-disabled"
                        : ""
                    }
                  />
                </div>

                {!renderInCart && (
                  <div className="close" onClick={goHome}>
                    <p>-</p>
                  </div>
                )}
              </div>
            </div>

            <div
              className="card-details-box"
              style={
                renderInCart && !listCart.length
                  ? { opacity: 0, pointerEvents: "none" }
                  : {}
              }
            >
              <div className="btn-active-full-size-container">
                <button
                  className="btn-active-full-size"
                  onClick={() => activeViewFullSize(true)}
                >
                  <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1669268081/shop-mugs/navSvgs/fullSize_tribmb.png" />
                </button>
              </div>

              <div
                className="img-wrap"
                style={{
                  transition:
                    mug.type === "magic" || mug.type === "limited"
                      ? "background-image .5s"
                      : "background-image 0s",
                  backgroundImage: `url("${
                    mugTemp
                      ? reSizeImage(mug.image, 600)
                      : mug.image_cold
                      ? reSizeImage(mug.image_cold, 600)
                      : reSizeImage(
                          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1668567500/shop-mugs/items/Edition%20Limited/cloudAndHot/mug_cold_magic_v5m7ye.png",
                          600
                        )
                  }")`,
                  opacity: 0.9,
                }}
              >
                <div className="info-wrap">
                  {(mug.type === "limited" || mug.type === "magic") && (
                    <div className="desc-box">
                      <div className="wrap">
                        <img
                          src="https://res.cloudinary.com/dz9smi3nc/image/upload/w_60/v1668459418/shop-mugs/navSvgs/temp_tubwr5.png"
                          alt="image temperature"
                        />
                      </div>
                      <div className="wrap">
                        <p>CHANGE WHIT TEMPERATURE</p>
                      </div>
                    </div>
                  )}

                  {(mug.type === "limited" || mug.type === "magic") && (
                    <div
                      className="desc-box"
                      style={{ flexBasis: "31%", background: "transparent" }}
                    >
                      <div className="wrap-temp">
                        <div className="temp">
                          <p>TEMPERATURE</p>
                        </div>
                        <div className="btn-switch">
                          <div
                            className="cold"
                            onClick={() => setMugTemp(false)}
                            style={
                              !mugTemp ? { backgroundColor: "#4d465de2" } : {}
                            }
                          >
                            <p>COLD</p>
                          </div>
                          <div
                            className="hot"
                            onClick={() => setMugTemp(true)}
                            style={
                              mugTemp ? { backgroundColor: "#4d465de2" } : {}
                            }
                          >
                            <p>HOT</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="desc-box" style={{ height: "3.9rem" }}>
                    <div className="wrap">
                      <img
                        style={{ height: "45%", padding: ".5rem" }}
                        src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1668460759/shop-mugs/navSvgs/shield_p8ahgm.png"
                        alt="image temperature"
                      />
                    </div>
                    <div className="wrap">
                      <p>MUG STRONG AGAINST FALLS</p>
                    </div>
                  </div>
                </div>

                <div className="info-wrap">
                  <div className="info-edit">
                    <div className="info-edit-box">
                      <div
                        style={
                          (mug.price * amount > 10 && {
                            marginLeft: "-.3rem",
                            paddingLeft: ".8rem",
                          }) ||
                          {}
                        }
                        className="price"
                      >
                        $ {(mug.price * amount).toFixed(2)}
                      </div>
                    </div>
                    <div className="info-edit-box">
                      <div className="info-type">
                        <p className={`${colorType(mug.type)}`}>
                          {mug.type.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="info-edit-box">
                      <div className="amount">x {amount}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="card-details-box"
              style={
                renderInCart && !listCart.length
                  ? { opacity: 0, pointerEvents: "none" }
                  : {}
              }
            >
              <div className="btn-gruop">
                <div
                  className="btn-box"
                  onClick={() => {
                    addItemInCart(mug.id, amount);
                    if (renderInCart) deleteItemInCart(mug.id);
                  }}
                >
                  {renderInCart ? (
                    <>
                      <p>REMOVE</p>
                    </>
                  ) : (
                    <>
                      <p>ADD</p>
                      <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/w_60/v1668449509/shop-mugs/navSvgs/cart-svg_adtx9k.png" />
                    </>
                  )}
                </div>
                <div className="btn-box">
                  <p>BUY NOW</p>
                </div>
                <div className="btn-box">
                  <div
                    className="wrap"
                    onClick={() => {
                      updateAmount(-1);
                      if (mugFromCart)
                        updateAmountInRedux(mug.id, mug.amount, -1);
                    }}
                  >
                    <p>-</p>
                  </div>
                  <div
                    className="wrap"
                    onClick={() => {
                      updateAmount(1);
                      if (mugFromCart)
                        updateAmountInRedux(mug.id, mug.amount, 1);
                    }}
                  >
                    <p>+</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
