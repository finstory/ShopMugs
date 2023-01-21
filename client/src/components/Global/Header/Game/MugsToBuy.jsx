import React, { useEffect, useState } from "react";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import ReactPlayer from "react-player";
import { useRef } from "react";
import { useGlobalContext } from "../../../../context/useGlobal";
export const MugsToBuy = () => {
  const {
    global: {
      mugsLimited,
      advertising: { activeGame },
      gameAdv: { isLoading, loadingProgress, listGifs },
    },
    getCart,
    getAllMugsLimited,
    addItemInCart,
    searchItemLimited,
  } = useGlobalServices();
  const { global, setGlobal } = useGlobalContext();
  const [idItem, setIdItem] = useState(null);
  const [urlGif, seturUrlGif] = useState("");
  const [urlShadow, setUrlShadow] = useState("");
  const [gifLoad, setGifLoad] = useState(false);
  const urlGifRef = useRef(null);
  const { listWindows, switchWindows } = useManagerWindows(["active"]);

  const closeWindow = () => {
    localStorage.setItem("cart", JSON.stringify({ mug: "" }));
    setGlobal({
      mugsLimited: {
        ...global.mugsLimited,
        nameItem: "",
        active: false,
      },
    });
  };

  const TimeToClose = () => {
    setTimeout(() => {
      closeWindow();
    }, 1500);
  };

  useEffect(() => {
    if (urlGifRef && urlGifRef.current)
      if (urlGifRef.current.naturalHeight > 0) setGifLoad(true);
      else setGifLoad(false);
  });

  useEffect(() => {
    isLoading && getAllMugsLimited();
  }, [isLoading]);

  useEffect(() => {
    if (listGifs) {
      const filterMug = listGifs.find(
        (item) => item.id_limited === mugsLimited.nameItem
      );
      if (filterMug && filterMug.animation) {
        seturUrlGif(filterMug.animation);
        setUrlShadow(
          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1667418409/shop-mugs/items/Edition%20Limited/animacion_qjw4jy.png"
        );
        setIdItem(filterMug.id);
      }
    }
  }, [mugsLimited.nameItem]);

  //* This effect optimize preload to animations.
  useEffect(() => {
    switchWindows("active", mugsLimited.active, 500, 500);
    return () => {
      setIdItem(null);
      seturUrlGif("");
      setUrlShadow("");
    };
  }, [mugsLimited.active]);

  useEffect(() => {
    setGlobal({ gameAdv: { ...global.gameAdv, isFocus: true } });
  }, [global.mugsLimited.active]);



  if (activeGame)
    return (
      <>
        {listWindows.active && (
          <div
            className={`mugs-limited-container ${
              !mugsLimited.active
                ? "clickOff anim-showing-reverse"
                : "anim-showing"
            }`}
          >
            <div className="mugs-limited">
              {gifLoad && ( // * Wait to download gif mug.
                <>
                  <div className="index-box anim-mug-limited-transalte">
                    <div className="images-container">
                      <img
                        src={urlShadow}
                        className="anim-mug-limited-brightness"
                      />
                      <img src={urlGif} />
                    </div>
                  </div>
                  <div className="index-box">
                    <div className="buy-btn anim-mug-limited-show-delay">
                      <div
                        className="btn-box"
                        onClick={() => {
                          idItem && addItemInCart(idItem);
                          closeWindow();
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
                    onClick={closeWindow}
                  >
                    <div className="text-box">X</div>
                  </div>
                </>
              )}
              {mugsLimited.nameItem === "custom" && (
                <div className="wrap-coming-soon anim-mug-limited-transalte">
                  <p className="text-coming-soon anim-text-brightness">
                    NEW FEATURE COMING SOON !
                  </p>
                  {TimeToClose()}
                </div>
              )}
            </div>
          </div>
        )}
        <div style={{ display: "none" }}>
          <img ref={urlGifRef} src={urlGif} />
        </div>
      </>
    );
};
