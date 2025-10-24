
import {  useEffect, useState } from "react";


export function useKey(key,action) {
    
      useEffect(() =>{
    
        const handleCallBack = (e) =>{
          if(e.code.toLowerCase() === key.toLowerCase() ){
            action();
          }
      }
    
        document.addEventListener('keydown' ,handleCallBack)
        return () =>{
          document.removeEventListener('keydown',handleCallBack)
        }
      },[action,key])
}

