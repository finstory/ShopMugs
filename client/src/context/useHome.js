import { createContext, useContext, useReducer, useState } from "react";

export const HomeContext = createContext();

export const useHome = () => {
    const initialState = {
        carousel: {
            list: [],
            maxPage: 2,
            actualPage: 1,
        },
        filtersHome: {
            material: "show all",
            category: "show all",
            price: "none",
            type: "show all",
            search: ""
        }
        , activeFullView: false,
        activeTodayOffer: false,
    };

    function Home(state, action) {
        switch (action.type) {
            case action.type:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }

    const [home, dispatch] = useReducer(Home, initialState);


    const setHome = (data) => {
        dispatch({ type: Object.keys(data)[0], payload: data })
    }

    return ({ home, setHome })
}

export const useHomeContext = () => {
    const context = useContext(HomeContext);
    return context;
};