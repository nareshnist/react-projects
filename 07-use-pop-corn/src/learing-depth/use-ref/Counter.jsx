
/**
 * 
 * 🔰 Challenge 2 — Click Counter WITHOUT Re-render
 * 
    ❓ Task

        Count how many times a button is clicked
        Do NOT re-render the UI
        Log count to console only

        🧠 Hint
        useRef instead of useState
 * 
 * 
 */

import { useRef } from "react"

function Counter() {
    const countClicks = useRef(0);
    const handleClicks = () => {
            countClicks.current += 1;
            console.log(countClicks.current);
         }
    return (
        <div>
            <button type="button" onClick={handleClicks}>Clicked</button>
        </div>
    )
}

export default Counter
