import React from "react";
import { useHomeServices } from "../../../services/useHomeServices";
import { Advertising } from "./Advertising/Advertising";
import { Filters } from "./Filters/Filters";
import { NavBar } from "./NavBar/NavBar";
import { SearchBar } from "./SearchBar/SearchBar";

export const Header = () => {
  const {
    home: { activeFullView },
  } = useHomeServices();
  return (
    <header className="header-index container-header">
      <NavBar />
      <Advertising />
      <SearchBar />
      {!activeFullView && <Filters />}
    </header>
  );
};
