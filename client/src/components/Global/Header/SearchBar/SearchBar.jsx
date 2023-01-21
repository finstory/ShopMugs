import React, { useEffect } from "react";
import { img } from "../../../../assets/images";
import { useGlobalContext } from "../../../../context/useGlobal";
import { useHomeContext } from "../../../../context/useHome";
import { useForm } from "../../../../hooks/useForm";
import { useManagerText } from "../../../../hooks/useManagerText";
export const SearchBar = () => {
  const {
    global: { gameAdv },
    setGlobal,
  } = useGlobalContext();
  const {
    home: { filtersHome,activeFullView },
    setHome,
  } = useHomeContext();
  const { allFirstUpperCase } = useManagerText();

  const [values, handleInputChange, reset] = useForm({name: ""});
  const { name } = values;
  const inputSubmit = (e) => {
    e.preventDefault();
    setHome({ filtersHome: { ...filtersHome, search: values.name } });
  };

  const focusInput = (condition) => {
    setGlobal({ gameAdv: { ...gameAdv, isFocus: condition } });
  };

  useEffect(() => {
    values &&
      !values.name &&
      setHome({ filtersHome: { ...filtersHome, search: values.name } });
  }, [values]);

useEffect(() => {
  !activeFullView && reset();
}, [activeFullView])


  return (
    <div className="header-box">
      <div className="header__search">
        <div className="search-box">
          <p>MOONBOX</p>
        </div>
        <div className="search-box">
          <form onSubmit={inputSubmit} className="input-box">
            <button
              type="submit"
              className="svg-glass"
              style={{
                decoration: "none",
                backgroundColor: "transparent",
                border: 0,
              }}
            >
              <img src={img.glass} alt="place" />
            </button>
            <div onSubmit={inputSubmit} style={{ zIndex: 40 }}>
              <input
                name="name"
                type="text"
                placeholder="Search your favorites Mugs"
                autoComplete="off"
                value={allFirstUpperCase(name)}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>

        <div className="search-box">
          <div className="svg-flex">
            <div className="svg-box">
              <img src={img.face} alt="Place" />
            </div>
            <div className="svg-box">
              <img src={img.ig} alt="Place" />
            </div>
            <div className="svg-box">
              <img src={img.twitter} alt="Place" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
