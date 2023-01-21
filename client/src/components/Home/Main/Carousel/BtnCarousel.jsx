import React from "react";
import { img } from "../../../../assets/images";
import { useGlobalContext } from "../../../../context/useGlobal";
import { useHomeServices } from "../../../../services/useHomeServices";
export const BtnCarousel = () => {
  const {
    goPageHome,
    home: {
      carousel: { actualPage, maxPage },
    },
  } = useHomeServices();

  const {
    global: { gameAdv },
    setGlobal,
  } = useGlobalContext();

  const diabledFocusInGame = (condition) => {
    setGlobal({ gameAdv: { ...gameAdv, isFocus: condition } });
  };

  const disabledBtn = (num) => {
    if (actualPage === num) return "#796b79cc";
    else return "#f2eff4b0";
  };

  const leftCodition = actualPage <= 1;
  const rigthCondition = actualPage >= maxPage;

  return (
    <div className="carousel-btn">
      <div
        className="left"
        style={{
          cursor: leftCodition ? "default" : "",
          opacity: leftCodition ? ".5" : "",
        }}
        onClick={() => {
          !leftCodition &&  goPageHome(actualPage - 1);
        }}
      >
        <img src={img.arrow} alt="arrow left carousel" />
      </div>
      <div
        className="rigth"
        style={{
          cursor: rigthCondition ? "default" : "",
          opacity: rigthCondition ? ".5" : "",
        }}
        onClick={() => {
          !rigthCondition && goPageHome(actualPage + 1);
        }}
      >
        <img src={img.arrow} alt="arrow rigth carousel" />
      </div>
    </div>
  );
};
