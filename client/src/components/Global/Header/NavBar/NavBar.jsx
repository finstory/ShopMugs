import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img } from "../../../../assets/images";
import { useLoginContext } from "../../../../context/useLogin";
import { useManagerWindows } from "../../../../hooks/useManagerWindows";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import { useHomeServices } from "../../../../services/useHomeServices";
import { ModalProfile } from "../ModalProfile/ModalProfile";
import { LoginBtn } from "./LoginBtn";

export const NavBar = () => {
  const { switchTodayOffer } = useHomeServices();

  const listImgActive = {
    home: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666620346/shop-mugs/navSvgs/home_a1vesl.svg",
    star: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666638361/shop-mugs/navSvgs/star_2_gnldub.svg",
    mug: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666638501/shop-mugs/navSvgs/mug_1_udy0tf.svg",
    help: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666638918/shop-mugs/navSvgs/help_f3ucoz.svg",
  };

  return (
    <div className="header-box">
      <ModalProfile />
      <nav className="header__menu">
        <div className="menu-box">
          <img src={img.logo} alt="logo moonbox" />
        </div>
        <Link to="./" className="menu-box">
          <div className="img-box">
            <img src={img.home} />
            <img src={listImgActive.home} />
          </div>
          <p>HOME</p>
        </Link>
        <Link
          to="./"
          className="menu-box"
          onClick={() => switchTodayOffer(true)}
        >
          <div className="img-box">
            <img src={img.star} />
            <img src={listImgActive.star} />
          </div>
          <p>TODAY'S OFFER</p>
        </Link>
        <div className="menu-box">
          <div className="img-box">
            <img src={img.mug} />
            <img src={listImgActive.mug} />
          </div>
          <p>CUSTOMIZED</p>
        </div>
        <div className="menu-box">
          <div className="img-box">
            <img src={img.help} />
            <img src={listImgActive.help} />
          </div>
          <p>SUPPORT</p>
        </div>
        <div className="menu-box">
          <LoginBtn />
        </div>
      </nav>
    </div>
  );
};
