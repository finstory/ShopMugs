import React from "react";
import { useGlobalServices } from "../../../../services/useGlobalServices";
import { useLoginServices } from "../../../../services/useLoginServices";

export const Profile = () => {
  const { logout } = useLoginServices();
  const { switchModalProfile, swtichModalOrder } = useGlobalServices();
  return (
    <div className="slide-profile">
      <div className="slide-profile-box anim-showing">
        <div className="img-box-border">
          <div className="img-box">
            <img
              src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1666780762/shop-mugs/users-profile-photo/iam_cpb5lk.png"
              alt="your photo"
            />
          </div>
        </div>
      </div>
      <div className="slide-profile-box anim-showing">
        <p>FACUNDO ALVAREZ</p>
        <p>FACU995ELECTRO@HOTMAIL.COM</p>
      </div>
      <div className="slide-profile-box anim-showing">
        <div className="btn-orders" onClick={() => swtichModalOrder(true)}>
          <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1666883847/shop-mugs/navSvgs/order_ubyw3c.png" />
          <p>ORDERS</p>
        </div>
        <div
          className="btn-logout"
          onClick={() => {
            logout();
            switchModalProfile("profile");
          }}
        >
          <img src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1666884043/shop-mugs/navSvgs/56805_w35kas.png" />
          <p>LOGOUT</p>
        </div>
      </div>
    </div>
  );
};
