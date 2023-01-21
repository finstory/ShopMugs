import React from "react";
import { AppMain } from "./router/AppMain";
import { ContextProvider } from "./context/context";
import "./assets/styles/normalize.css";
import "./assets/styles/scroll.css";
import "./assets/styles/header.css";
import "./assets/styles/main.css";
import "./assets/styles/animation.css";
import "./assets/styles/changeColor.css";
import "./assets/styles/login.css";
import "./assets/styles/slideProfile.css";
import "./assets/styles/mugsLimited.css";
import "./assets/styles/details.css";
import "./assets/styles/fullView.css";
import "./assets/styles/cart.css";
import "./assets/styles/orders.css";
import "./assets/styles/ofertToday.css";
import { Test } from "./Test";

const App = () => {

  return (
      <ContextProvider>
            {/* <Test/> */}
        <AppMain />
      </ContextProvider>
  );
};

export default App;
