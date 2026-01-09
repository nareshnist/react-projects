
// import { useState,useEffect } from "react";

import { useEffect, useState } from "react";

// /*
// 1️⃣ What is a Custom Hook?
// Simple definition

// A custom hook is your own hook that you create to reuse logic in React components.

// 👉 It is just a JavaScript function that:

// Starts with use

// Uses one or more React hooks inside (useState, useEffect, etc.)

// Returns data or functions

// */


// export function useFetch(searchquery){
   
//     const [posts,setPosts] = useState([]);
//     const [error ,setError] = useState('');
//     const [isloading,setIsLoading] = useState(false);
    
//     useEffect(() => {
    
//       const controller = new AbortController();
    
    
//         async function  searchPost() {
//           try {
    
//             setIsLoading(true);
//             setError('')
//             // CONNECTING WITH FETCH {SIGNALE:}
//            const response =  await fetch(`https://jsonplaceholder.typicode.com/posts/${Number(searchquery)}`,{signal:controller.signal});
//            console.log(response)
//            if((!response).ok)throw new Error(`Something went wrong while fetching the data`)
    
//           const postdata = await response.json();
    
//           if(!postdata?.id)throw new Error(`Post is not found ${searchquery}`)
            
//           setPosts(posts => [postdata]);
//           setError("");
//           } catch (error) {
//               console.error(error);
    
//               if(error.name !== 'AbortError'){
//                 setError(error.message)
//               }
              
//           }finally{
//             setIsLoading(false);
//           }
//         }

//         if(!searchquery) return;
//         searchPost()
       

//     return () =>  {
//         controller.abort()
//     }
//     },[searchquery]);


//     return {
//         posts,
//         error,
//         isloading
//     }
// }
















/*
  my aplication has the list the all products on load 

  when userSearch get the product 
  for that i am creating an re usbale component.

*/










export function useFetch(url)  {
    const [data , setData] = useState(null);
    const [error ,setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() =>{
        if(!url) return

        const controller  = new AbortController();

          const fetchData = async () =>{
              try {
                  setIsLoading(true);
                  setError('');
                  const response = await fetch(url,{signal:controller.signal});
                  if(!response.ok) throw new Error('An Error Ocured while fetching data');

                  const data = await response.json();
                  setData(data)

              } catch (error) {
                if (error.name !== 'AbortError') {
                  setError(error.message);
                }

              }finally{
                setIsLoading(false);
              }
          }
          
          fetchData();

          return () =>{
            controller.abort()
          }
    },[url]);

    return {
      data,isLoading,error
    }
}

/*

  ✅

  🧠 4️⃣ This is a COMMON & ACCEPTED pattern

  You’ll see this in real projects:

  const url = searchTerm
  ? `/api/products?search=${searchTerm}`
  : null;

const { data, isLoading, error } = useFetch(url);


*/