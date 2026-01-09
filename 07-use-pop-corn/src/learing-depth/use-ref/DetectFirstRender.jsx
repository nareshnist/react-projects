import { useEffect, useRef } from "react";


/*
🚨 Challenge 6 — Detect First Render
❓ Task

Log "First render" only once
Log "Re-render" on updates

🧠 Hint
useRef(true)

*/

function DetectFirstRender() {

    const  isFirstRender = useRef(true);


useEffect(() => {
        if(isFirstRender.current){
            console.log("First Render");
            isFirstRender.current = false;
        }else{
            console.log("Re -rendered")
        }
        return null
    }
)

    return (
        <div>
            
        </div>
    )
}

export default DetectFirstRender
