import { useParams } from "react-router-dom";
import axios from 'axios';
import { useNav } from "./useNav";
import { useGlobalContext } from "../context/useGlobal";
import { useHomeContext } from "../context/useHome";
import { useDetailsContext } from "../context/useDetalis";
import { useChangeContext } from "../context/useChange";

export const useServices = () => {
    const { change: { nameApi }, setChange } = useChangeContext();
    const { global, setGlobal } = useGlobalContext();
    const { home, setHome } = useHomeContext();
    const { details, setDetails } = useDetailsContext();
    const { redirectPage, redirectDetails } = useNav();
    const param = useParams();
    const id = nameApi === "countries" ? param.id : parseInt(param.id) || 1;

    const goPage = async (num) => {

        const { inputValue: { name = "nameAsc", prop2, orderBy } } = global;
        let payload = { list: [], next: false, openAdd: false };
        let propOrder, typeOrder = "";
        setGlobal({ actualPage: num });

        switch (orderBy) {
            case "nameDesc":
                propOrder = "name";
                typeOrder = "desc";
                break;

            case "propDesc":
                propOrder = "prop2";
                typeOrder = "desc";
                break;

            case "propAsc":
                propOrder = "prop2";
                typeOrder = "asc";
                break;

            default:
                propOrder = "name";
                typeOrder = "asc";
                break;
        }
        const configPetition = (number) => {
            let petition = `http://localhost:3001/${nameApi}?_page=${number}&_limit=18`;

            if (name) petition += `&name=${name}`;
            if (prop2) petition += `&prop2=${prop2}`;
            petition += `&_sort=${propOrder}`;
            petition += `&_order=${typeOrder}`;
            return petition;
        }

        await axios(configPetition(num))
            .then((resp) => {
                payload.list = resp.data;
                payload.next = true;
            })
            .catch((e) => console.log(e));


        await axios(configPetition(num + 1))
            .then((resp) => {
                if (!resp.data.length) payload.next = false;
            })
            .catch((e) => console.log(e));

        setHome(payload);
        redirectPage(num);
    };

    const getItemById = async () => {
        let item = { itemById: {} };
        await axios(`http://localhost:3001/${nameApi}/${id}`)
            .then((response) => {
                item.itemById = response.data;
            })
            .catch((e) => console.log(e));

        setDetails({ ...item, openEdit: false });
    };

    const deleteItemById = async () => {
        await axios({
            method: 'delete',
            url: `http://localhost:3001/${nameApi}/${id}`,
        }).catch((e) => console.log(e));
        redirectPage(1);
    };

    const editItemById = async (itemEdit) => {
        await axios({
            method: 'patch',
            url: `http://localhost:3001/${nameApi}/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(itemEdit)
        }).catch((e) => console.log(e));
        setTimeout(() => {
            getItemById(id);
        }, 500);
    };

    const addItem = async (itemEdit) => {
        await axios({
            method: 'post',
            url: `http://localhost:3001/${nameApi}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(itemEdit)
        }).catch((e) => console.log(e));
        setTimeout(() => {
            redirectPage(1);
            goPage(1)
        }, 200);

    };

    const selecteApi = (api) => {
        setChange({ nameApi: api });
        setTimeout(() => {
            redirectPage(1);
            goPage(1)
        }, 200);
    }


    const resetDB = async () => {
        const pass = prompt('Password Admin :');
        await axios(`http://localhost:3001/reset?pass=${pass}`)
            .then(() => {
                alert("Reseting database, OK to continue...")
                setTimeout(() => {
                    redirectPage(1);
                    window.location.reload();
                }, 1000);
            })
            .catch((e) => alert("Error to input password(?)..."));
    };

    // * exportación de barril de var. de mi servicio.
    const varServices = { id: parseInt(id) };

    return { varServices, selecteApi, resetDB, deleteItemById, editItemById, addItem, goPage, getItemById, global, home, details };
}