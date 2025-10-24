import {useFetch} from "./custom-hooks/useFetch";

import './Loader.css'

useFetch

function PostsList() {

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'
    const {
        data: postList,
        loading,
        error
    } = useFetch(apiUrl);


    return (
        <>

           
           {
                loading && <Loader />
           }

            {
                error && <Error message={error} /> 
            }

            {
                !loading &&  !error && (
                    <ul>
                    {
                        postList?.map((post, i) => {
                            return <Post post={post} key={post.id} />
                        })
                    }
                </ul>
                )
            }
        </>
    )
}


function Post({ post }) {
    return (
        <>
            <li>
                <p>UserId : {post.userId}</p>
                <p>Id : {post.id}</p>
                <p>{post.title}</p>
                <p>{post.body}</p>
            </li>
        </>
    )
}



function Error({message}) {
  return (
    <div style ={{color: '#fff',backgroundColor:'red'}}>
        {message}
    </div>
  )
}

function  Loader(params) {
    return <span className="loader" ></span>
}




export default PostsList
