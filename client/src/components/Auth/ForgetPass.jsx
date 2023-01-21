import React, { useEffect } from "react";
import { useLoginContext } from "../../context/useLogin";

export const ForgetPass = () => {
  const { login, setLogin } = useLoginContext();

  useEffect(() => {
    setLogin({
      modal: {
        ...login.modal,
        photo:
          "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666817586/shop-mugs/users-profile-photo/email_gowg2b.png",
      },
    });

  }, []);
  return (
    <div className="login-wrap-box anim-showing">
      <div className="login-input-box">
        <label>EMAIL</label>
        <input type="text" placeholder="moonbox23@hotmail.com" />
      </div>

      <div className="login-submit-box">
        <div className="btn" style={{ width: "9rem" }}>
          <div className="submit" style={{ border: 0 }}>
            CHANGE
          </div>
        </div>
      </div>
    </div>
  );
};
