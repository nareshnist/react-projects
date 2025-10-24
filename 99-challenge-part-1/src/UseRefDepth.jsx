

import { useEffect, useLayoutEffect, useRef, useState } from "react"

function UseRefDepth() {
    const eleReference = useRef(null);

    useEffect(() => {
        eleReference.current.focus();

        // doing with useRef we don't need to query each time when we re-reder the componnet , unlike  querySelector
    },[])
    return (
        <div>
            <input ref={eleReference} type="text" name="userinput"/>
            <PersistingValue />
            <Timer />
            <Counter />
        </div>
    )
}

export default UseRefDepth



function PersistingValue() {

    const count = useRef(0)

    return (
       <button type="button" onClick={() =>{
        count.current += 1;
        console.log(count)
       }}>Increment</button>
    )

    // useRef use to quesrt dom
    // its liks useState but can be matuate the Ref where state can't be
    // useState rerender every update , userRef no 
    //
}


/*
🔹 useRef Recap

    useRef(initialValue) → returns an object { current: initialValue }.
    The .current value persists across renders.
    Updating .current does not cause a re-render.

🔹 When to use useRef

    ✅ Good for:

    Accessing/controlling DOM nodes (focus, scroll, measuring size).
    Storing values that need to “survive” re-renders (like timers, previous state, counters, cache).
    Avoiding re-creating values inside loops/effects (stable references).

    ❌ Not good for:

    Data that should be shown in the UI (use useState for that).


*/

// 🔹 Example 3: Storing a Timer ID


function Timer() {
    const timerId = useRef(null);

    const start = () => {
        timerId.current = setInterval(() => {
            console.log("tick")
        }, 2000);
    }

    const stop  = () => {
        clearInterval(timerId.current);

    }

    return (
      <>
        <button type="button" onClick={start}>Start</button>
        <button type="button" onClick={stop}>Stop</button>
      </>
    )
}

// 🔹 Example 4: Storing Previous State

function Counter () {
    const [counter,setCounter] = useState(0);
    const previousValue = useRef();


    useEffect(() => {
        previousValue.current = counter;
    },[counter])

    return (
        <>
            <p>Now : {counter}  , Before : {previousValue.current}</p>
            <button type="button" onClick={() => setCounter(c => c + 1)}>Increment</button>
        </>
    )
}