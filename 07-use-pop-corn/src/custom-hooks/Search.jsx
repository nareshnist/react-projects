import { useState } from "react"
import { useFetch } from "./useFetch"


function Search() {
    const [postId,setPostid] = useState('');

    useFetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return (
        <div>
            <input type="text" name="" id="" value={postId} onChange={(E) => setPostid(E.target.value)} />
        </div>
    )
}

export default Search
