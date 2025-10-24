
import { useEffect, useState,useRef } from "react";
import { useKey } from "../useKey";

function Search({query,setQuery}){

    const inputElement  = useRef(null);

    // useEffect(() => {
    //     const el = document.querySelector('.search');
    //     console.dir(el);
    //     el.focus(); 

    //     // selecting the elemenet more declarative way 
    // },[])


    useKey('Enter',function() {
        if(document.activeElement === inputElement){
            return
        }
            inputElement.current.focus();
            setQuery('');
    })

    // useEffect(()=>{
    //     console.log(inputElement.current);
    //     // inputElement.current.focus();

    //     const callback =  (e) => {
 
            
    //     }

    //     document.addEventListener("keydown",callback)

    //     return ()=> {
    //         document.removeEventListener("keydown",callback)
    //     }
    // },[setQuery])
    
    return (
        <input
        ref={inputElement}
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
    />
    )
}

export default Search;