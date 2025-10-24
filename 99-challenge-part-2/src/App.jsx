
import PostsList from './PostList';

import {useRef, useState } from 'react'

import './App.css'
import { useKey } from './custom-hooks/useKey';

export default function App(){
    const [value, setValue] = useState("");
    const ele = useRef(null)

    useKey('Enter',function(){
       if(document.activeElement === ele.current){
        return
       }
       ele.current.focus()
    })

    return <>
        <h1>Welcome to React custom hooks</h1>

        <input ref={ele} type="text" value={value} onChange={(e) => setValue(e.target.value)} />

        <PostsList />
    </> 
}