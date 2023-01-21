import { useEffect, useState } from 'react';

export const useSwtichWindow = (dependecy) => {
    const [switchAnim, setSwitchAnim] = useState(true);

    useEffect(() => {
        setSwitchAnim(true);
    }, [dependecy])


    const closeWindow = (fn, delay) => {
        setSwitchAnim(false);
        setTimeout(() => {
            fn(!dependecy);
        }, delay);
    };

    return { closeWindow, switchAnim };

}
