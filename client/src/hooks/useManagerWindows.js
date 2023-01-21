import { useEffect, useState } from 'react';

export const useManagerWindows = (list) => {
    const [listWindows, setListWindows] = useState({});

    useEffect(() => {
        let initialState = {};
        for (let i = 0; i < list.length; i++)
            initialState = { ...initialState, [list[i]]: false };
        setListWindows(initialState);
    }, [])


    const changeOptions = (name, timeout = 0, dependecy) => {
        setTimeout(() => {
            for (const i in listWindows) if (i === name)
                setListWindows({ ...listWindows, [i]: dependecy });
        }, timeout);
    };

    const switchWindows = (name, dependency, timeOpen = 0, timeClose = 0, fn) => {
        if (!dependency && fn) { fn(false); changeOptions(name, timeClose, dependency); }
        else changeOptions(name, timeOpen,dependency);
    };

    return { switchWindows, listWindows };

}
