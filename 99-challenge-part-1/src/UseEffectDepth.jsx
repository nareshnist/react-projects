import { use, useEffect, useState } from "react";

function UseEffectDepth (){

    const [count ,setCount] = useState(0);
    const [userName ,setUserName] = useState("");
    const [isVisible ,setIsVisible] = useState(true);


    const handleClick = () => {
        setCount(count => count + 1)
    }

    const handleUserName = () => {
        setUserName('Naresh Jupalle')
    }



    // example for no dependencies

    // useEffect(() => {
    //     console.log("Component rendered or updated!")
    // })


    // example for  dependencies
    useEffect(() => {
        console.log("Count changed:", count);
      }, [count]); // only runs when 'count' changes

    return <>
     {/* <button onClick={handleClick}>Increase Count</button>
     <button onClick={handleUserName}>Change String</button> */}


    {/* Clear effect secnario one which is called setinterval  */}

    {/* {isVisible &&  <CleanUseEffect />}

     <button type="button" onClick={(e) => {
        setIsVisible(!isVisible);
     }}>Hide</button> */}


    {/* Clear effect secnario two which is whenever we use the eventListners   */}

    {/* <ClearEventListners /> check if wanted to by add one state to that componte like increment ..cte */} 

    {/* Clear effect secnario theree which is when dependency changes   */}
     
     <DependencyChange />
    </>
}


export default UseEffectDepth;


/* 
🔹 Step 2: Basic Usage (no dependencies)
    🔍 What happens here:

        Component renders → useEffect runs.

        If you click the button, state updates → re-render → useEffect runs again.

        ⚠️ Without dependencies, useEffect runs after every render.
*/



/*

🔹 Step 3: Dependency Array

        The dependency array controls when your effect runs.

    1. Run once on mount

        useEffect(() => {
            console.log("Runs only once, when component mounts");
        }, []); // empty array → no dependencies

        The effect will not run on updates.

    2. Run when specific state or prop changes
        const [count, setCount] = useState(0);
        useEffect(() => {
        console.log("Count changed:", count);
        }, [count]); // only runs when 'count' changes

        Here, the effect runs only when count changes, not on every render.

    3. Multiple dependencies    
        const [count, setCount] = useState(0);
        const [name, setName] = useState("");

        useEffect(() => {
        console.log("Count or name changed:", count, name);
        }, [count, name]); // runs when either changes

        const [count, setCount] = useState(0);


        🔑 Key Rules
            1. Always include all variables used inside effect in the dependency array.
            2. If a variable is not included → React will warn (or you may get stale values).
            3. If you don’t pass the array → effect runs after every render.

        💡 Think of it like this:
            [] → “run once”
            [x] → “run whenever x changes”
            omitted → “run every render”

🔹 Step 4: Cleanup Functions

        Sometimes effects set up resources (like timers, subscriptions, or event listeners).
        If we don’t clean them up, they can cause memory leaks or unexpected behavior.
        React allows you to return a cleanup function from inside useEffect.
        
        1. Example: Timer (setInterval / setTimeout)
            -  CleanUseEffect()
            👉 Without cleanup, if you leave the page or re-render, the timer would keep running in the background.

        2. Example: Event Listeners
            -  ClearEventListners()
            👉 Without cleanup, every re-render would add new listeners, causing duplicate logs.

        3. Example: Runs again when dependency changes
            👉 When userId changes, React first calls the cleanup, then runs the effect again.

🔑      Rules
                Cleanup function runs when:

                The component unmounts.
                Before the effect re-runs due to dependency change.
                Always clean up external side effects like:
                Timers
                Subscriptions (WebSocket, API, etc.) (API search )
                Event listeners




    👉 If your effect uses something that can change (props, state, or functions declared in the parent), you should include it in the dependency array.



    You’re correct — in 95% of real-world React development, these are the exact use cases:

        Fetching data (with cleanup)
            Abort API requests on unmount or when query changes.
        Event listeners
            Add on mount → remove on unmount.
        Timers / intervals
            setTimeout, setInterval → clear on unmount.
        Syncing external state
            Example: saving to localStorage, updating document.title, etc.
*/

function CleanUseEffect() {
    const [count, setCount] = useState(0);

    useEffect(() => {
         const intervalId = setInterval(() => {
            setCount(count => count + 1)
            console.log("hello naresh")
         },1000)
         console.log(intervalId)

    // ✅ Cleanup: clear interval when component unmounts
    return () => {
        clearInterval(intervalId);
        console.log("Interval cleared");
      };
    },[]);

    return <p>Count : {count}</p>

}

function ClearEventListners(){

    useEffect(() => {

        const handleResize = () => {
          console.log("Window width:", window.innerWidth);
        };
      
        window.addEventListener("resize", handleResize);
      
        // ✅ Cleanup: remove listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };

      }, []); // run once

    // 👉 Without cleanup, every re-render would add new listeners, causing duplicate logs.
}


function DependencyChange(){
    const [userInput ,setUserInput] = useState("");


    useEffect(() => {
        console.log("new value is :" ,userInput)

        return() => {
            console.log("old value is ",userInput)
        }
    },[userInput])


    return <>
        <input type="text" value ={userInput} onChange={(e) => setUserInput(e.target.value)}/>
    </>

    // 👉 When userId changes, React first calls the cleanup, then runs the effect again.
}


