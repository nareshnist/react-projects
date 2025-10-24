import { useState } from "react";
import { useFetch } from "./custom-hooks/useFetch";
import { useKey } from "./custom-hooks/useKey";


function PostsList() {

    const [selectedPost, setSelectedPost] = useState(null);

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    const {
        data: postList,
        loading,
        error
    } = useFetch(apiUrl);


    const handleSelectedPost = (post) => {
        setSelectedPost((currentPost => post.id === currentPost?.id ? null : post) );
    }

    const handleClosePost = () =>{
        setSelectedPost(null);
    }

    useKey('Escape',handleClosePost)

    return (
        <>

         <div className="container">
         <div className="post-list">
                {
                    loading && <Loader />
                }



                {
                    !loading && !error && (
                        <ul>
                            {
                                postList?.map((post, i) => {
                                    return <Post post={post} key={post.id} onClick={handleSelectedPost} />
                                })
                            }
                        </ul>
                    )
                }

                {
                    error && <Error message={error} />
                }
            </div>
            <div className="selectd-post">
                {
                  selectedPost &&  <SelectedPost selectedPost={selectedPost} onClosePost={handleClosePost}/>
                }
            </div>
         </div>

        </>
    )
}


function Post({ post, onClick }) {
    return (
        <>
            <li onClick={() => onClick(post)}>
                <span>ID : {post.id}</span>
                <p> Title : {post.title}</p>
            </li>
        </>
    )
}



function Error({ message }) {
    return (
        <div style={{ color: '#fff', backgroundColor: 'red' }}>
            {message}
        </div>
    )
}

function Loader() {
    return <span className="loader" ></span>
}

function SelectedPost({selectedPost,onClosePost}){
    
    return (
        <div>
            <h2>{selectedPost.title}</h2>
            <p>{selectedPost.body}</p>
            <small>User: {selectedPost.userId} | selectedPost ID: {selectedPost.id}</small>

            <button type="button" onClick={onClosePost}> Close Post</button>

            </div>
            
        );
}


function fetchPost() {
    return  
}



export default PostsList
