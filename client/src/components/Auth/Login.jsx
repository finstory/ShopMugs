import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { useLoginServices } from "../../services/useLoginServices";

export const Login = () => {
  const { getImageWhitEmail, loginInMoonBox, activeLogin } = useLoginServices();

  const [values, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleSubmitLogin = async () => {
    loginInMoonBox(email, password);
  };

  useEffect(() => {
    getImageWhitEmail(email);
  }, [email]);



  return (
    <form className="login-wrap-box anim-showing" onSubmit={handleSubmitLogin}>
      <div className="login-input-box">
        <label>EMAIL</label>
        <input
          name="email"
          type="text"
          placeholder="moonbox23@hotmail.com"
          onChange={handleInputChange}
        />
      </div>

      <div className="login-input-box">
        <label>PASSWORD</label>
        <input
          name="password"
          type="text"
          placeholder="**********"
          onChange={handleInputChange}
        />
      </div>

      <div className="login-submit-box">
        <div className="btn">
          <div className="submit" onClick={handleSubmitLogin}>
            ENTER
          </div>
          <div className="google">
            <img
              src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_.png"
              alt="google"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
