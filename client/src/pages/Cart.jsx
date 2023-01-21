import React, { useEffect, useLayoutEffect, useRef } from "react";
import { BtnCart } from "../components/Cart/BtnCart";
import { ListCart } from "../components/Cart/ListCart";
import { CardDetails } from "../components/Details/CardDetails";
import { useDetailsContext } from "../context/useDetalis";
import { useNav } from "../hooks/useNav";
import { useGlobalServices } from "../services/useGlobalServices";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { ImageFullSize } from "../components/Details/ImageFullSize";
export const Cart = () => {
  const { goHome } = useNav();
  const refCart = useRef();
  const { details, setDetails } = useDetailsContext();
  const {
    editAmountItemInCart,
    deleteItemInCart,
    global: {
      cart: { listCart, itemSelected },
    },
  } = useGlobalServices();
  // window.scrollTo(0, offsetHeight);

  useEffect(() => {
    setDetails({ renderInCart: true });

    return () => {
      setDetails({ renderInCart: false });
    };
  }, []);

  if (listCart)
    return (
      <div className="details-container" ref={refCart}>
        <ImageFullSize />
        <div className="cart-container">
        {itemSelected &&  <CardDetails
            mugFromCart={listCart.find((item) => item.id === itemSelected)}
          />}
          <div className="list-cart">
            <div className="title">
              <p>List Cart</p>
              <p>Mugs x {listCart.length}</p>
            </div>
            <ListCart />
            <BtnCart />
          </div>
          {/* <ListCart /> */}
        </div>
        <div className="btn-back" onClick={goHome}>
          <div className="img-wrap">
            <img
              src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1668472998/shop-mugs/navSvgs/back_cij8jw.png"
              alt="icon back"
            />
          </div>
          <p>BACK</p>
        </div>
      </div>
    );
};
