import React, { useEffect, useState } from "react";
import { useHomeContext } from "../../context/useHome";
import { useManagerText } from "../../hooks/useManagerText";
import { useHomeServices } from "../../services/useHomeServices.js";
export const FiltersFull = () => {
  const { allFirstUpperCase } = useManagerText();
  const { switchFullView, resetFilters } = useHomeServices();
  const {
    home: { filtersHome },
    setHome,
  } = useHomeContext();
  const arrowDown =
    "https://res.cloudinary.com/dz9smi3nc/image/upload/v1668205441/shop-mugs/navSvgs/Arrow-down.svg_qz83og.png";

  const [listActiveMenus, setListMenuActive] = useState({
    material: false,
    category: false,
    price: false,
    type: false,
  });

  const [inputValues, setInputValues] = useState(filtersHome);

  useEffect(() => {
    setHome({
      filtersHome: {
        ...filtersHome,
        ...inputValues,
        search: filtersHome.search,
      },
    });
  }, [inputValues]);

  const handleInputChange = (e, name) => {
    setInputValues({
      ...inputValues,
      [name]: e.target.innerHTML.toLowerCase(),
    });
  };

  const switcActiveMenus = (name, cond) => {
    JSON.stringify(cond)
      ? setListMenuActive({ ...listActiveMenus, [name]: cond })
      : setListMenuActive({
          ...listActiveMenus,
          [name]: !listActiveMenus[name],
        });
  };

  return (
    <div className="filters">
      <div
        className="close"
        onClick={() => {
          switchFullView(false);
          resetFilters();
        }}
      >
        <p>-</p>
      </div>
      <div className="filters-box-container">
        <div
          className="filters-box"
          style={{
            borderRadius: listActiveMenus.type ? "1rem 1rem 0 0" : "1rem",
          }}
          onClick={() => {
            switcActiveMenus("type");
          }}
          onPointerEnter={() => {
            switcActiveMenus("type");
          }}
          onPointerLeave={() => {
            switcActiveMenus("type", false);
          }}
        >
          <p>Type :</p>
          <p> {allFirstUpperCase(inputValues.type)}</p>
          <img src={arrowDown} alt="arrow-down" />
          {listActiveMenus.type && (
            <div className="selector">
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "type")}>Show All</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "type")}>Normal</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "type")}>Moon</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "type")}>Magic</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "type")}>Limited</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filters-box-container">
        <div
          className="filters-box"
          style={{
            borderRadius: listActiveMenus.material ? "1rem 1rem 0 0" : "1rem",
          }}
          onClick={() => {
            switcActiveMenus("material");
          }}
          onPointerEnter={() => {
            switcActiveMenus("material");
          }}
          onPointerLeave={() => {
            switcActiveMenus("material", false);
          }}
        >
          <p>Material :</p>
          <p> {allFirstUpperCase(inputValues.material)}</p>
          <img src={arrowDown} alt="arrow-down" />
          {listActiveMenus.material && (
            <div className="selector">
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "material")}>
                  Show All
                </p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "material")}>Ceramic</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "material")}>Plastic</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filters-box-container">
        <div
          className="filters-box"
          style={{
            borderRadius: listActiveMenus.category ? "1rem 1rem 0 0" : "1rem",
          }}
          onClick={() => {
            switcActiveMenus("category");
          }}
          onPointerEnter={() => {
            switcActiveMenus("category");
          }}
          onPointerLeave={() => {
            switcActiveMenus("category", false);
          }}
        >
          <p>Category :</p>
          <p> {allFirstUpperCase(inputValues.category)}</p>
          <img src={arrowDown} alt="arrow-down" />
          {listActiveMenus.category && (
            <div className="selector">
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "category")}>
                  Show All
                </p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "category")}>Anime</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "category")}>Gamers</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "category")}>Movies</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="filters-box-container">
        <div
          className="filters-box"
          style={{
            borderRadius: listActiveMenus.price ? "1rem 1rem 0 0" : "1rem",
          }}
          onClick={() => {
            switcActiveMenus("price");
          }}
          onPointerEnter={() => {
            switcActiveMenus("price");
          }}
          onPointerLeave={() => {
            switcActiveMenus("price", false);
          }}
        >
          <p>Price :</p>
          <p> {allFirstUpperCase(inputValues.price)}</p>
          <img src={arrowDown} alt="arrow-down" />
          {listActiveMenus.price && (
            <div className="selector">
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "price")}>None</p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "price")}>
                  Low to Higth
                </p>
              </div>
              <div className="option">
                <p onClick={(e) => handleInputChange(e, "price")}>
                  Higth to Low
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
