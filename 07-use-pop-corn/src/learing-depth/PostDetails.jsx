import { useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";

function PostDetails({ selectedPostId }) {
  const [post, setPosts] = useState({});
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPostDetails() {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedPostId}`
      );
      if (!response.ok) throw new Error("Something went wrong");
      const data = await response.json();
      setPosts(data);
      setIsLoading(false);
    }

    fetchPostDetails();
  }, [selectedPostId]);


  useEffect(() => {
    if(!post.title) return
      document.title = `Post | ${post.title}`

      return function (){
        document.title = `Usepopcorn`;
        console.log(`clearn up effect ${selectedPostId}`)
      }
  },[post.title]);


  useEffect(() =>{

      const handleEvent =  function(e){
          if(e.code === 'Escape'){
            console.log("closing ")
          }
      }
      document.addEventListener('keydown',handleEvent);


      return () => {
          document.removeEventListener('keydown',handleEvent);
          console.log("-----------")
      }
  });

  return (
    <div>
      {isloading && <Loader />}
      {!isloading && (
        <>
          <p>{post.title}</p>
          <p>{post.body}</p>
        </>
      )}
    </div>
  );
}

export default PostDetails;
