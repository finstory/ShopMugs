import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../context/useLogin";
import { useManagerWindows } from "../../hooks/useManagerWindows";
import { useLoginServices } from "../../services/useLoginServices";
import { ForgetPass } from "./ForgetPass";
import { Login } from "./Login";
import { PhotoLogin } from "./PhotoLogin";
import { SingUp } from "./SingUp";

export const Auth = () => {
  const {
    login: {
      modal: { photo, open, mode },
      user: { logged },
    },
  } = useLoginContext();

  const { setMode, getImageWhitEmail, activeLogin } = useLoginServices();
  const handleSwithMode = () => {
    switch (mode) {
      case "sing_up":
        return <SingUp />;
      case "forget_pass":
        return <ForgetPass />;
      default:
        return <Login />;
    }
  };

  const { listWindows, switchWindows } = useManagerWindows(["open"]);

  useEffect(() => {
    switchWindows("open", open, 0, 300, activeLogin);
  }, [open]);

  useEffect(() => {
    logged && activeLogin(false);
  }, [logged]);

  if (listWindows.open)
    return (
      <div
        className={`container-bg-off ${
          open ? "anim-showing" : "anim-showing-reverse"
        }`}
      >
        <div className="login-container anim-translate-to-down">
          <PhotoLogin photo={photo} />
          <div className="login-wrap">
            <div className="login-wrap-box">
              <div
                className="login-close"
                onClick={() => {
                  activeLogin(false);
                }}
              >
                <p>X</p>
              </div>
              {mode === "forget_pass" ? (
                <div className="btn-sing">
                  <p>RESET</p>
                  <p
                    onClick={() => {
                      setMode("login");
                    }}
                  >
                    BACK
                  </p>
                </div>
              ) : (
                <div className="btn-sing">
                  <p
                    onClick={() => {
                      setMode("login");
                    }}
                  >
                    LOGIN
                  </p>
                  <p
                    onClick={() => {
                      setMode("sing_up");
                    }}
                  >
                    SING UP
                  </p>
                </div>
              )}
              <div className="bar-line">
                <div
                  className={`selector ${
                    mode === "sing_up" && "sing-up-active"
                  }`}
                ></div>
              </div>
            </div>

            {handleSwithMode()}
            {/* <ForgetPass /> */}
            <div className="login-wrap-box">
              <p
                onClick={() => {
                  setMode("forget_pass");
                }}
              >
                FORGET YOUR PASSWORD ?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  else return <></>;
};
