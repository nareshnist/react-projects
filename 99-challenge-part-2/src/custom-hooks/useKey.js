import { useEffect } from "react";


export function useKey(keyName,callback){

    useEffect(() => {

        const handle = (e) => {
            if(e.code.toLowerCase() === keyName.toLowerCase()){
                callback();
            }
        }

        document.addEventListener("keydown", handle);

        return () => {
            document.removeEventListener("keydown", handle);
        }

  
    },[keyName,callback]) 
}