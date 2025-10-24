import { useEffect, useState } from "react";

export function useLocalStorageState(intialState, key) {

  const [value, setValue] = useState(function () {
    // don't run on sub sequesnt render only on mount 
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : intialState
  });


  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue]
}

