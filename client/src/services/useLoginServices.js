import { useParams } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from "../context/useGlobal";
import { useHomeContext } from "../context/useHome";
import { calcMaxPage } from "../helpers/calcMaxPage";
import { useLoginContext } from "../context/useLogin";
import { useGlobalServices } from "./useGlobalServices";

export const useLoginServices = () => {

  const { login, setLogin } = useLoginContext();

  //* Manager Modal Login.

  const activeLogin = (condition) => {
    setLogin({
      modal: { ...login.modal, open: condition },
    });
  };

  const setMode = (option) => {
    setLogin({
      modal: { ...login.modal, mode: option },
    });
  };

  const getImageWhitEmail = async (email) => {
    await axios(`http://localhost:3001/users?email=${email}`)
      .then((resp) => {
        if (resp.data[0])
          setLogin({
            modal: { ...login.modal, photo: resp.data[0].photo },
          });
        else
          setLogin({
            modal: { ...login.modal, photo: "" },
          });
      })
      .catch((e) => console.log(e));
  };


  const loginInMoonBox = async (email, pass) => {
    await axios(`http://localhost:3001/users?email=${email}&pass=${pass}`)
      .then((resp) => {
        if (resp.data[0]) {
          const user = {
            logged: true,
            userId: resp.data[0].id,
            photo: resp.data[0].photo,
            small_photo: resp.data[0].small_photo,
            email: resp.data[0].email,
            type: resp.data[0].user_type,
          };
          setLogin({ user });
        }
      })
      .catch((e) => console.log(e));
  }


  const logout = () => {
    const user = {
      logged: false,
      userId: null,
      photo: "",
      small_photo: "",
      email: "",
      type: "anon",
    };
    setLogin({ user });

  }

  //$ Manager Modal Login.


  return { setMode, activeLogin, getImageWhitEmail, loginInMoonBox, logout, login, setLogin };
};
