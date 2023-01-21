import React, { useEffect } from "react";
import { useHomeServices } from "../../services/useHomeServices";
import { CardMain } from "../Home/Main/Galery/CardMain";
import { FiltersFull } from "./FiltersFull";

export const MainFull = () => {

    const item = {
        "id": 1,
        "name": "Dragon Ball Super",
        "sub_name": "Goku Ultra Instict",
        "image": "https://res.cloudinary.com/dz9smi3nc/image/upload/v1667914563/shop-mugs/items/IMAGE_iltip4.png",
        "full_image": "https://res.cloudinary.com/dz9smi3nc/image/upload/v1667294262/shop-mugs/items/Photo_Full/ultra-instinct_5bfk.1280_eusmqf.webp",
        "description": "lorem Ipsum is Lorem Ipsum but I love Lorem Ipsum but I don't like Lorem Ipsum and I don't like Lorem Ipsum",
        "type": "Magic",
        "price": "6.25",
        "category1": "anime",
        "category2": "magic",
        "amount": 1
      };

      const {
        goPageHome,
        global,
        home: {
          carousel: { list },
          filtersHome
        },
      } = useHomeServices();
      useEffect(() => {
        console.log(filtersHome)
        goPageHome(1,9999);
      }, [filtersHome]);

  return (
    <div className="main-full">
     <FiltersFull/>
      <main className="galery-container">
    <div className="galery">

    {list && list.length ? (
          list.map((mug) => <CardMain key={mug.id} {...mug} />)
        ) : (
          <></>
        )}
{/* <CardMain {...item}/>
<CardMain {...item}/>
<CardMain {...item}/>
<CardMain {...item}/> */}
    </div>

      </main>
    </div>
  );
};
