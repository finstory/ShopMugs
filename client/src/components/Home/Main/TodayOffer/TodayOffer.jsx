import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../../context/useGlobal";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import { useHomeServices } from "../../../../services/useHomeServices";
export const TodayOffer = () => {
  const {
    switchTodayOffer,
    home: { activeTodayOffer },
  } = useHomeServices();

  const { addItemInCart } = useGlobalServices();

  const [urlGif, seturUrlGif] = useState("");
  const [urlShadow, setUrlShadow] = useState("");
  const [gifLoad, setGifLoad] = useState(false);
  const refOffer = useRef();
  const urlGifRef = useRef(null);
  const { listWindows, switchWindows } = useManagerWindows(["active"]);

  const TimeToClose = () => {
    setTimeout(() => {
      switchTodayOffer(false);
    }, 500);
  };

  useEffect(() => {
    const scrollY = window.scrollY;
    for (let i = scrollY; i < refOffer.current.clientHeight; i++) {
      setTimeout(() => {
        window.scrollTo(0, i);
      }, i);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (urlGifRef && urlGifRef.current)
        if (urlGifRef.current.naturalHeight > 0) setGifLoad(true);
        else setGifLoad(false);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (activeTodayOffer) {
      seturUrlGif(
        `https://res.cloudinary.com/dz9smi3nc/image/upload/v1669235475/shop-mugs/items/Edition%20Limited/AnimBowser_vwlyd7.gif?a=${parseInt(
          Math.random() * 10000
        )}`
      );
      setUrlShadow(
        "https://res.cloudinary.com/dz9smi3nc/image/upload/v1667418409/shop-mugs/items/Edition%20Limited/animacion_qjw4jy.png"
      );
    }
  }, [activeTodayOffer]);

  //* This effect optimize preload to animations.
  useEffect(() => {
    switchWindows("active", activeTodayOffer, 500, 500);
  }, [activeTodayOffer]);

  return (
    <div
      className={`main-full ${
        listWindows.active ? "clickOff anim-showing-reverse" : "anim-showing"
      }`}
      style={{ backgroundColor: "#18181980", maxWidth: "none" }}
    >
      <div
        className="mugs-limited"
        style={{
          backgroundColor: "transparent",
          marginTop: "0rem",
          zoom: "110%",
          minHeight: "41rem",
        }}
        ref={refOffer}
      >
        {gifLoad && (
          <>
            <div className="index-box anim-mug-limited-transalte">
              <div className="images-container anim-showing">
                <img src={urlShadow} className="anim-mug-limited-brightness" />
                <img src={urlGif} />
              </div>
            </div>
            <div className="index-box">
              <div className="buy-btn anim-mug-limited-show-delay">
                <div
                  className="btn-box"
                  onClick={() => {
                    addItemInCart(40);
                    switchWindows("active", activeTodayOffer, 100, 100);
                    TimeToClose();
                  }}
                >
                  <p> ADD NOW</p>
                  <div className="img-wrap">
                    <img
                      src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1667477135/shop-mugs/navSvgs/shopping-cart-icon_1_qbqf7r_1_raj10e.png"
                      alt=""
                    />
                  </div>
                </div>
                <div className="btn-box type-limited">
                  <p>EDICITION LIMITED</p>
                </div>
              </div>
            </div>
            <div
              className="index-box anim-mug-limited-transalte"
              //   onClick={closeWindow}
            ></div>
          </>
        )}
      </div>

      <p className="text-today-offer">
        ONLY FOR TODAY{" "}
        <span style={{ textDecoration: "line-through" }}>$ 8.00 US</span> $ 4.00
        US
      </p>

      <div
        className="btn-back"
        style={{ marginTop: "4rem", width: "14.5rem", gap: ".1rem" }}
        onClick={() => {
          switchWindows("active", activeTodayOffer, 100, 100);
          TimeToClose();
        }}
      >
        <div className="img-wrap">
          <img
            src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1668472998/shop-mugs/navSvgs/back_cij8jw.png"
            alt="icon back"
          />
        </div>
        <p>NO THANKS</p>
      </div>

      <div style={{ display: "none" }}>
        <img ref={urlGifRef} src={urlGif} />
      </div>
    </div>
  );
};
