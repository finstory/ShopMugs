import React, { useEffect } from "react";
import { useLoginContext } from "../../../../context/useLogin";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import { useLoginServices } from "../../../../services/useLoginServices";

export const LoginBtn = () => {
    const {
        activeLogin,
        login: {
            user: { logged, small_photo, photo },
        },
    } = useLoginServices();
    const { switchModalProfile } = useGlobalServices();
    const { listWindows, switchWindows } = useManagerWindows(["logged"]);

  useEffect(() => {
    switchWindows("logged", logged, 0, 300);
  }, [logged]);

  if (!listWindows.logged)
    return (
      <div
        className={`btn-sing-up btn-sing-up-logged ${
          !logged ? "anim-showing" : "anim-showing-reverse"
        }`}
      >
        <div
          className="img"
          onClick={() => {
            switchModalProfile("profile");
          }}
        >
          {small_photo ? (
            <img
              src={small_photo}
              style={{
                borderRadius: "50%",
                border: "solid 2px #6a5a7f",
                opacity: 0.9,
              }}
            />
          ) : (
            <img
              src={
                "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666863787/shop-mugs/navSvgs/perfil_2_vfim0t_1_1_tyfqlk.png"
              }
            />
          )}
        </div>

        <div
          className="img"
          onClick={() => {
            switchModalProfile("favorites");
          }}
        >
          <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1666862965/shop-mugs/navSvgs/heart_fhqop6_wlwx4k.png" />
        </div>
        <div
          className="img"
          onClick={() => {
            switchModalProfile("cart");
          }}
        >
          <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1666863092/shop-mugs/navSvgs/shopping-cart-icon_1_qbqf7r_1_ovyqdd.png" />
        </div>
      </div>
    );
  else
    return (
      <div
        className={`btn-sing-up ${
          !logged ? "anim-showing" : "anim-showing-reverse"
        }`}
        onClick={activeLogin}
      >
        <div className="img">
          <img
            src={
              photo
                ? photo
                : "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666863787/shop-mugs/navSvgs/perfil_2_vfim0t_1_1_tyfqlk.png"
            }
          />
        </div>
        <div className="text">
          <p>LOGIN</p>
        </div>
      </div>
    );
};
