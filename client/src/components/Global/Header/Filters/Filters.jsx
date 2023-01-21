import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/useGlobal";
import { useManagerText } from "../../../../hooks/useManagerText";
import { useGlobalServices } from "../../../../services/useGlobalServices";

export const Filters = () => {
  const { getAllCategories } = useGlobalServices();
  const { global, setGlobal } = useGlobalContext();
  const listCategories = [
    "all mugs",
    "anime",
    "gamers",
    "normal",
    "magic",
    "moon",
    "limited",
  ];
  const { allFirstUpperCase } = useManagerText();

  const setFiltersCategory = (category) => {
    setGlobal({
      filtersCarousel: { ...global.filtersCarousel, category },
    });
  };

  const colorSelected = (category) => {
    if (global.filtersCarousel.category === category) return true;
    else return false;
  };

  useEffect(() => {
    getAllCategories();
    return ()=>{
      setGlobal({
        filtersCarousel: { ...global.filtersCarousel, category : "" },
      });
    }
  }, []);

  return (
    <div className="header-box">
      <nav className="header__categories">
        {listCategories && listCategories.length ? (
          listCategories.map((cate_name, i) => (
            <div className="cate-box" key={i}>
              <p
                onClick={() => {
                  setFiltersCategory(cate_name);
                }}
                className={colorSelected(cate_name) ? "cate-box-selected" : ""}
              >
                {allFirstUpperCase(cate_name)}
              </p>
            </div>
          ))
        ) : (
          <></>
        )}
      </nav>
    </div>
  );
};
