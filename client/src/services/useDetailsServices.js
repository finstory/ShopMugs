import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDetailsContext } from "../context/useDetalis";


export const useDetailsServices = () => {
    const { details, setDetails } = useDetailsContext();
    const param = useParams();
    const idParam = param.id || "";
    const getItemById = () => {
        axios(`http://localhost:3001/products/${idParam}`)
            .then((resp) => {
                const item = resp.data;
                setDetails({ item });
            })
            .catch((e) => console.log(e));
    }

    const setUrlToViewFullSize = (url) => {
        setDetails({ imageFullSize: { ...details.imageFullSize, url } });
    }

    const activeViewFullSize = (cond) => {
        setDetails({ imageFullSize: { ...details.imageFullSize, active: cond } });
    }

    return { setUrlToViewFullSize, activeViewFullSize, getItemById, idParam, details };
}