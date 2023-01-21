import React from "react";
import { CardDetails } from "../components/Details/CardDetails";
import { ImageFullSize } from "../components/Details/ImageFullSize";
import { useNav } from "../hooks/useNav";
import { useDetailsServices } from "../services/useDetailsServices";
import { useGlobalServices } from "../services/useGlobalServices";

export const Details = () => {
  const { goHome } = useNav();
  const {
    global: {
      favorites: { listItemId },
    },
  } = useGlobalServices();
  const {
    details: { item },
  } = useDetailsServices();

  if (item && listItemId)
    return (
      <div className="details-container">
              <ImageFullSize />
        <CardDetails />
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
