import React from "react";
import { useManagerWindows } from "../../hooks/useManagerWindows";
import { useDetailsServices } from "../../services/useDetailsServices";

export const ImageFullSize = () => {
  const { listWindows, switchWindows } = useManagerWindows(["active"]);
  const {
    details: { imageFullSize },
    activeViewFullSize,
  } = useDetailsServices();
  if (imageFullSize.active)
    return (
      <div
        className={`main-full ${
          listWindows.active ? "clickOff anim-showing-reverse" : "anim-showing"
        }`
    }
        style={{
          position: "absolute",
          backgroundColor: "#18181996",
          height: "56rem",
          maxWidth: "none",
          zIndex: "2",
        }}
      >
        <div className="full-size-card">
          <div className="img-wrap anim-showing">
            <img src={imageFullSize.url} alt="mugs in full size" />
            <button
              className="btn-close"
              onClick={() => activeViewFullSize(false)}
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    );
};
