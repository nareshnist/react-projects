
/**
 * 
 *  ⚠️ Challenge 3 — Why UI Is Not Updating?
    ❓ Buggy Code
 */

import { useRef } from "react"

    function BuggyCode() {
        const countRef = useRef(0);

        const handleClick = () => {
            countRef.current +=1;
        }
        return (
            <div>
                <p>Count :{countRef.current}</p>
                <button type="button" onClick={handleClick}>Increment</button>
            </div>
        )
    }
    
    export default BuggyCode;

/* 
Your explanation

    updating the use ref it does not render the component hence , we can't see updated value.

✔️ Correct and interview-ready

    Bonus interviewer answer

    React does not track ref updates for rendering, so changing ref.current will not update the UI.

*/
    