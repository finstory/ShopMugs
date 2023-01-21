import { createContext, useContext, useReducer, useState } from "react";

export const LoginContext = createContext();

export const useLogin = () => {
    const initialState = {
        modal: {
            open: false,
            mode: "login",
            photo: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1666775196/shop-mugs/users-profile-photo/Coffee-Cup-Silhouette_y88c4i.png"
        },
        user: {
            logged: false,
            userId: "9a420928-ad87-45b3-bbf8-4838ee27cc97", // !  userId: null,
            photo: "",
            small_photo: "",
            email: "",
            type: "anon",
        }
    };

    function Login(state, action) {
        switch (action.type) {
            case action.type:
                return { ...state, ...action.payload };
            default:
                return state;
        }
    }

    const [login, dispatch] = useReducer(Login, initialState);


    const setLogin = (data) => {
        dispatch({ type: Object.keys(data)[0], payload: data })
    }


    return ({ login, setLogin })
}

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    return context;
};