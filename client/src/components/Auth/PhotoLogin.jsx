import React, { useReducer, useState } from "react";
import { useEffect } from "react";
import { useLoginServices } from "../../services/useLoginServices";
import useForceUpdate from "use-force-update";
export const PhotoLogin = ({photo}) => {
  const forceUpdate = useForceUpdate();
  const [rendered, setRendered] = useState(false);
  useEffect(()=>{
     setRendered(true);
     console.log("h");
  },[photo])

  return (
    <div className="login-photo anim-translate-to-down">
      <img
        className={rendered ? "anim-showing" : ""}
        src={
          photo.length
            ? photo
            : "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666775196/shop-mugs/users-profile-photo/Coffee-Cup-Silhouette_y88c4i.png"
        }
      />
    </div>
  );
};
