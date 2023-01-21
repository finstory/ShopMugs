import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGlobalContext } from "../context/useGlobal";
import { AppRouter } from "./AppRouter";

export const AppMain = () => {
  const { global, setGlobal } = useGlobalContext();

  const keyDownTextField = (e) => {
    const item = JSON.parse(window.localStorage.getItem("cart"));
    if (item.mug.length && e.code === "KeyE")
      setGlobal({
        mugsLimited: {
          ...global.mugsLimited,
          nameItem: item.mug,
          active: true,
        },
      });
    else {
      window.localStorage.setItem("cart", JSON.stringify({ mug: "" }));
      setGlobal({
        mugsLimited: {
          ...global.mugsLimited,
          nameItem: "",
          active: false,
        },
      });
    }
  };


  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify({ mug: "" }));
  }, []);

  return (
    // <BrowserRouter basename="/dist">
    <div
      style={{ position: "relative" }}
      onKeyUp={keyDownTextField}
      onKeyDown={keyDownTextField}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
