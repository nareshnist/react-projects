import { useEffect, useRef } from "react"


/**
 * 
 * 🧩 useRef Code Challenges
        🔰 Challenge 1 — Focus Input (DOM access)

        ❓ Task
        Create an input
        Focus it automatically when the component mounts
        Use useRef

        🧠 Hint
        ref.current.focus()
        Use useEffect
 * 
 */

function Foucs() {
    const inputEl = useRef(null)


    //useRef should be used inside effects or event handlers (not during render logic).
    useEffect(() => {
        // Add a null safety check (best practice):
          inputEl.current?.focus();
    },[]);
 
    return (
        <div>
            <input type="text" ref={inputEl} />
        </div>
    )
}

export default Foucs
