import React from 'react'

export const useImageTools = () => {

    const reSizeImage = (url, weigth) => {
        let newUrl = "";
        const list = url.split("/upload/");

        for (let i = 0; i < list.length; i++)
            if (i === 0) newUrl = list[i] + `/upload/w_${weigth},f_auto/`;
            else newUrl += list[i];

        return newUrl;
    };

    return { reSizeImage }

}
