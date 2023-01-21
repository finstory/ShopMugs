import React, { useEffect } from "react";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import { useLoginServices } from "../../../../services/useLoginServices";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";
import { Profile } from "./Profile";
import { useGlobalContext } from "../../../../context/useGlobal";
import { Cart } from "./Cart";
import { Favorites } from "./Favorites";
export const ModalProfile = () => {
  const {
    global,
    global: {
      modalProfile: { active, mode },
    },
    switchModalProfile,
  } = useGlobalServices();

  const { setGlobal } = useGlobalContext();

  const { listWindows, switchWindows } = useManagerWindows(["active"]);

  const handleSwithMode = (option) => {
    switch (option) {
      case "favorites":
        return <Favorites />;
      case "cart":
        return <Cart />;
      default:
        return <Profile />;
    }
  };

  useEffect(() => {
    switchWindows("active", active, 100, 100);
  }, [active]);

  if (listWindows.active)
    return (
      <div
        className={`slide-profile-container ${
          active ? "anim-expand-profile" : "anim-expand-profile-reverse"
        }`}
      >
        <div className="slide-profile-adjust">{handleSwithMode(mode)}</div>
      </div>
    );
};
