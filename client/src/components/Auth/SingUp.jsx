import React, { useEffect } from "react";
import { useLoginContext } from "../../context/useLogin";

export const SingUp = () => {
  const { login, setLogin } = useLoginContext();

  useEffect(() => {
    setLogin({
      modal: { ...login.modal, photo: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666817037/shop-mugs/users-profile-photo/newuser_iifahk.png" },
    });

  }, [])
  

  return (
    <div className="login-wrap-box anim-showing">
      <div className="login-input-box">
        <label>NAME</label>
        <input type="text" placeholder="MOON BOX" />
      </div>

      <div className="login-input-box">
        <label>EMAIL</label>
        <input type="text" placeholder="moonbox23@hotmail.com" />
      </div>

      <div className="login-input-box">
        <label>PASSWORD</label>
        <input type="text" placeholder="**********" />
      </div>

      <div className="login-submit-box">
        <div className="btn" style={{ width: "10rem" }}>
          <div className="submit" style={{ border: 0 }}>
            REGISTER
          </div>
        </div>
      </div>
    </div>
  );
};
