import { createContext, useContext, useReducer } from "react";

export const GlobalContext = createContext();

export const useGlobal = () => {

    const initialState = {

        listOrders: [],

        listCategories: [],

        advertising: {
            activeGame: false,
        },
        filtersCarousel: {
            category: "all mugs",
            maxPage: 2
        },
        modalProfile: {
            active: false,
            mode: "profile",
        },
        orders: {
            isActive: false,
            listOrders: [],
        },
        cart: {
            id: null,
            listCart: [],
            itemSelected: "",
            totalPrice: 0,
        },
        favorites: {
            id: null,
            listFavorites: [],
        },

        mugsLimited: {
            active: false,
            idItem: null,
            nameItem: ""
        },
        gameAdv: {
            isFocus: true,
            activeGame: false,
            isLoading: false,
            loadingProgress: 0,
            listGifs: [],
        },

        scrollManager: {
            goDetails: false,
            goOffer: false,
        },

        inputValue: {
            name: "",
            prop2: "",
            orderBy: "",
        },
        actualPage: 1,
    };



    function Global(state, action) {
        switch (action.type) {
            case action.type:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }

    const [global, dispatch] = useReducer(Global, initialState);

    const setGlobal = (data) => {
        dispatch({ type: Object.keys(data)[0], payload: data })
    }

    return ({ global, setGlobal })
}

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    return context;
};