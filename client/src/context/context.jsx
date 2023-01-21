import { createContext, useContext, useState } from "react";
import { DetalisContext, useDetalis } from "./useDetalis";
import { GlobalContext, useGlobal } from "./useGlobal";
import { HomeContext, useHome } from "./useHome";
import { LoginContext, useLogin } from "./useLogin";

export const ContextProvider = ({ children }) => {
  const { login, setLogin } = useLogin();
  const { global, setGlobal } = useGlobal();
  const { home, setHome } = useHome();
  const {details, setDetails } = useDetalis();
  const rhola = () => <p>sdsd</p>
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <GlobalContext.Provider value={{ global, setGlobal }}>
        <DetalisContext.Provider value={{ details, setDetails }}>
          <HomeContext.Provider value={{ home, setHome }}>
            {children}
          </HomeContext.Provider>
        </DetalisContext.Provider>
      </GlobalContext.Provider>
    </LoginContext.Provider>
  );
};
