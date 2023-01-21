import React, { useEffect } from "react";
import { useHomeServices } from "../../../services/useHomeServices";
import { MainFull } from "../../FullView/MainFull";
import { CarouselMain } from "./Carousel/CarouselMain";
import { SelectorCarousel } from "./Carousel/SelectorCarousel";
import { TodayOffer } from "./TodayOffer/TodayOffer";

export const Main = () => {
  const {
    switchTodayOffer,
    home: { activeFullView, activeTodayOffer },
  } = useHomeServices();
  useEffect(() => {
    // switchTodayOffer(true);
  }, []);

  return (
    <>
      {activeTodayOffer ? (
        <TodayOffer />
      ) : (
        <>
          {activeFullView ? (
            <MainFull />
          ) : (
            <>
              <CarouselMain />
              <SelectorCarousel />
            </>
          )}
        </>
      )}
    </>
  );
};
