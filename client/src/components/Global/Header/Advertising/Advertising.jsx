import React, { useState } from "react";
import { img } from "../../../../assets/images";
import { useGlobalContext } from "../../../../context/useGlobal";
import { Game } from "../Game/Game";

export const Advertising = () => {
  const {
    global,
    global: {
      advertising: { activeGame },
    },
    setGlobal,
  } = useGlobalContext();

  const [styleAnimOpacity, setStyleAnimOpacity] = useState("");
  const [styleBtnBeforeClick, setStyleBtnBeforeClick] = useState("");
  const switchGame = (condition) => {
    setStyleAnimOpacity("anim-opacity-reverse");
    setStyleBtnBeforeClick("btn-play-beforeclick");
    setTimeout(() => {
      setGlobal({
        advertising: { ...global.advertising, activeGame: condition },
      });
    }, 2000);
  };

  return (
    <div className="header-box header-add">
      <div className="header__adv">
        {activeGame ? <Game /> : <></>}
        {!activeGame ? (
          <div className={`adv-bg ${styleAnimOpacity}`}>
            <div className="publicidad">
              <div className="img"
              >
                {/* <img src="./img/publicidad-completa.png" /> */}
              </div>
            </div>
            <div className="play-wrap">
              <div className="center-wrap">
                <button
                  className={`btn-play ${styleBtnBeforeClick}`}
                  onClick={() => {
                    switchGame(true);
                  }}
                >
                  <p>GO TO PLAY</p>
                  <div className="btn-play-img">
                    <img src={img.btn_play} />
                  </div>
                </button>
                <div className="text-play">
                  <p>check out our trending products right now</p>
                </div>
              </div>
            </div>

            <div className="pixel-char">
              <div className="char-box">
                <div className="char-moonbox">
                  <img src={img.pj} alt="character moonbox" />
                </div>
              </div>
              <div className="char-box">
                <div className="char-cat">
                  <img src={img.cat} alt="character cat" />
                </div>
              </div>
            </div>

            <div className="main-char">
              <div className="char-box">
                <div className="text-box">
                  <p>Create your own personalized mug. It's easy 👌🏻 ...</p>
                </div>
                <div className="char-moonbox">
                  <img src={img.drinking} alt="character moonbox" />
                </div>
              </div>
              <div className="char-box">
                <div className="text-box">
                  <p>10% Cash back to animal foundation DOOM ❤️... </p>
                </div>
                <div className="char-cat">
                  <img src={img.cat_illustator} alt="character cat" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
