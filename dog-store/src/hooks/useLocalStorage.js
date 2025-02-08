import { useState, useEffect } from 'react';

const getValueFromLocalStorage = (key, value) => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : value;
}

export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => getValueFromLocalStorage(key, initialValue));

    useEffect(() => {
       localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
   
    return [value, setValue];
};