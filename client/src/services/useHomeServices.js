import { useParams } from "react-router-dom";
import axios from 'axios';
import { useGlobalContext } from "../context/useGlobal";
import { useHomeContext } from "../context/useHome";
import { calcMaxPage } from "../helpers/calcMaxPage";
import { useManagerText } from "../hooks/useManagerText";

export const useHomeServices = () => {
    const { firsUpperCase } = useManagerText();
    const { global, setGlobal } = useGlobalContext();
    const { home, setHome } = useHomeContext();
    const param = useParams();
    const idParam = parseInt(param.id) || 1;


    const goPageHome = async (num, limit = 4) => {

        const { filtersHome: { material, category, price, type, search } } = home;
        let payload = { carousel: { ...home.carousel, list: [], maxPage: 2, actualPage: 1 } };
        const categoryCarousel = global.filtersCarousel.category;

        const configPetition = (number) => {
            let petition = `http://localhost:3001/products?_page=${number}&_limit=${limit}`;

            if (categoryCarousel && categoryCarousel !== "all mugs") {

                const listCategories = [
                    "anime",
                    "gamers",
                ];

                listCategories.includes(categoryCarousel) ?
                    petition += `&first_category=${categoryCarousel}` :
                    petition += `&sencond_category=${categoryCarousel}`;
            }

            if (category && category !== "show all") petition += `&first_category=${category}`;

            if (type && type !== "show all") petition += `&type=${type}`;

            if (search && search !== "") petition += `&name=${search.toLowerCase()}`;

            if (price && price !== "none")
                switch (price) {
                    case "low to higth":
                        petition += `&_order=price&_sort=ASC`;
                        break;
                    default:
                        petition += `&_order=price&_sort=DESC`;
                        break;
                }

            return petition;
        }

        await axios(configPetition(num))
            .then((resp) => {
                console.log(resp.data.totalProducts)
                payload.carousel.list = resp.data.list;
                payload.carousel.actualPage = num;
                payload.carousel.maxPage = resp.data.totalPages;
            })
            .catch((e) => console.log(e));

        setHome(payload);
    };

    const resetFilters = () => {
        setHome({
            filtersHome: {
                material: "show all",
                category: "show all",
                price: "none",
                type: "show all",
                search: ""
            }
        });
    }

    const switchFullView = (cond) => {
        // const {activeFullView} = home;
        setHome({ activeFullView: cond });
    }

    const switchTodayOffer = (cond) => {
        // const {activeFullView} = home;
        setHome({ activeTodayOffer: cond });
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


    return { goPageHome, switchTodayOffer, switchFullView, resetFilters, idParam, global, home };
}