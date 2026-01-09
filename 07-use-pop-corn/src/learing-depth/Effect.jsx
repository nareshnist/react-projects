import { useEffect } from "react";
import { useState } from "react";

// Components

import Loader from "./Loader";
import ErrorMesage from "./ErrorMesage";
import Form from "./Form";
import PostDetails from "./PostDetails";
import { useFetch } from "../custom-hooks/useFetch";

function Effect() {

    // const [posts,setPosts] = useState([]);
    // const [isloading,setIsLoading] = useState(false);
    // const [error ,setError] = useState('');
    const [searchquery,setSearchPost] = useState('');
    const [selectedPostId,setSelectedPostId] = useState(null)
 
    // fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()).then(res => setPosts(res)); infinite loop , that y we don't write this fetch call in the render logic

     

    //  setPosts(res) cause an error 




    //initial render
    // useEffect( () => {
    //     async function fetchPostData() {
    //       setIsLoading(true)
    //        try {
    //           const postResponse = await  fetch('https://jsonplaceholder.typicode.com/posts');

    //         if(!postResponse.ok){
    //           throw new Error("Something went wrong with fetching Posts")
    //         }

    //         const postData = await postResponse.json();

    //         // if(postData){ // 404 server retuns
    //         //     throw new Error("no data found ")
    //         // }

    //         setPosts(postData);

    //       // console.log(posts);  we can't access immediatly setting the it.

    //        } catch (error) {
    //         console.log(error.message)
    //         setError(error.message);
    //        }finally{
    //         // reseting the things 
    //          setIsLoading(false);
    //        }
    //     }

    //     fetchPostData();
        
    // },[]);




  //  example of order 

    // effect run after browser paints RESULTS : C, A,B
  //   useEffect(() =>{
  //     console.log("After initial Render")
  //   },[])

  //   useEffect(() =>{
  //     console.log("After every render")
  //   })


  // this only run on searchpost changes 
  //     useEffect(() =>{
  //     console.log("D")
  //   },[searchPost])


  //   // top level code 
  // console.log("During render")



  // Search Example 


  // useEffect(() => {

  // const controller = new AbortController();


  //   async function  searchPost() {
  //     try {



  //       setIsLoading(true);
  //       setError('')
  //       // CONNECTING WITH FETCH {SIGNALE:}
  //      const response =  await fetch(`https://jsonplaceholder.typicode.com/posts/${Number(searchquery)}`,{signal:controller.signal});
  //      console.log(response)
  //      if((!response).ok)throw new Error(`Something went wrong while fetching the data`)

  //     const postdata = await response.json();

  //     if(!postdata?.id)throw new Error(`Post is not found ${searchquery}`)
  //         setError("");

  //     setPosts(posts => [postdata])
  //     } catch (error) {
  //         console.error(error);

  //         if(error.name !== 'AbortError'){
  //           setError(error.message)
  //         }
          
  //     }finally{
  //       setIsLoading(false);
      
  //     }
      
  //   }

  //  if(!searchquery.length){
  //    setPosts([]);
  //    setError('');
  //    return
  //  }

  //  searchPost();


  //  return function() {
  //   controller.abort()
  //  }

  // },[searchquery]);


  const {posts,error ,isloading} = useFetch(searchquery);

    return (
        <div>
            <h1>USE EFFECT</h1>

            <Form onChange={setSearchPost} searchPost={searchquery} />

            {/* Loading true */}
            {isloading  && <Loader /> } 
            
            {/*if data ready with no errors*/}
            {!isloading  && !error &&  posts.map((post,index) => <PostCard post={post} key={post.id} onClick={setSelectedPostId} />)}

            {error && <ErrorMesage  message={error}/>  }

            <h1>Post detials</h1>

            {
              selectedPostId &&  <PostDetails  selectedPostId={selectedPostId}/>
            }
           
        </div>
    )
}

const PostCard = ({post,onClick}) => {

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        maxWidth: "600px"
      }}
    >
      <h2>{post.title}</h2>

      <div style={{ marginTop: "12px", fontSize: "14px", color: "#555" }}>
        <strong>Post ID:</strong> {post.id} <br />
      </div>

      <button
        style={{
          marginTop: "12px",
          padding: "6px 12px",
          backgroundColor: "#e53935",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Remove
      </button>

      <button
        style={{
          marginTop: "12px",
          padding: "6px 12px",
          backgroundColor: "green",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginLeft:"1rem"
        }}

        onClick={() => onClick(post.id)}
      >
        Fetch Details
      </button>
    </div>)
};




export default Effect
