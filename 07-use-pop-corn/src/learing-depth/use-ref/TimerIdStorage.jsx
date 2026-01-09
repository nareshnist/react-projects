import { useRef } from "react";


/*

⏱️ Challenge 5 — Timer ID Storage
❓ Task

Start an interval on button click

Stop the interval correctly

Avoid multiple intervals

🧠 Hint

Store setInterval ID in useRef

*/

function TimerIdStorage() {

    const intervalId = useRef(null);

    const handleStart = () => {
        if(intervalId.current)return

       intervalId.current =  setInterval(() => {
            console.log("Started")
        },1000)
    }

     const handleStop= () => {
      clearInterval(intervalId.current); // timer stop here 
      console.log(intervalId.current)
      intervalId.current = null; // if you don't reset the value you can't start again as we value existed and we are doing early return in the handleStart.
        
    }

    return (
        <div>
            <button type="button" onClick={handleStart}> Start</button> 
            <button type="button" onClick={handleStop}> Stop</button> 
        </div>
    )
}

export default TimerIdStorage;

/*

    📌 Interview insight:
        useRef prevents duplicate intervals across renders.

*/

