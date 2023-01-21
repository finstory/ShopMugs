import React, { useEffect } from "react";
import { MainFull } from "../components/FullView/MainFull";
import { useHomeServices } from "../services/useHomeServices";

export const FullView = () => {
  const {
    goPageHome,
    global,
    home: {
      carousel: { list },
    },
  } = useHomeServices();
  useEffect(() => {
    goPageHome(1);
  }, [global.filtersCarousel]);
  return <MainFull />;
};
