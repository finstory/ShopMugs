import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Auth } from "../components/Auth/Auth";
import { Footer } from "../components/Global/Footer/Footer";
import { MugsToBuy } from "../components/Global/Header/Game/MugsToBuy";
import { Header } from "../components/Global/Header/Header";
import { Orders } from "../components/Global/Orders/Orders";
import { Cart } from "../pages/Cart";
import { Details } from "../pages/Details";
import { FullView } from "../pages/FullView";
import { Home } from "../pages/Home";
import { useGlobalServices } from "../services/useGlobalServices";
import { useHomeServices } from "../services/useHomeServices";

export const AppRouter = () => {
  const { getCart, getFavorites, addItemInFavorites } = useGlobalServices();
  useEffect(() => {
    getCart();
    getFavorites();
  }, []);
  const {
    home: { activeFullView },
  } = useHomeServices();
  return (
    <>
      <MugsToBuy />
      <Orders />
      <Auth />
      <Header />
      <main className="main-index"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<Home />} />
          <Route path="/view_full/:page" element={<FullView />} />
          <Route path="/details/:id" element={<Details  />} />
          <Route path="/cart" element={<Cart  />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
