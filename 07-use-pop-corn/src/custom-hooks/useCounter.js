
/* 


Simple definition

A custom hook is your own hook that you create to reuse logic in React components.

👉 It is just a JavaScript function that:

Starts with use

Uses one or more React hooks inside (useState, useEffect, etc.)

Returns data or functions

Real-life analogy 🧠

Imagine:

You cook the same recipe every day

Instead of repeating steps, you write a recipe card

👉 That recipe card = custom hook

*/

import { useState } from "react";


export function useCounter (){
    const [count,setCount] = useState(0);

    function increment (){
        setCount(count => count + 1);
    }

    function decrement() {
        setCount(count => count -  1)
    }

    return {
        count,
        increment,
        decrement
    }
}

/*
    2️⃣ Why Do We Need Custom Hooks?

    Without custom hooks ❌
    You repeat the same logic in multiple components.

    With custom hooks ✅

    Reuse logic
    Clean components

    Easy maintenance

    Easy testing

*/



/*
    3️⃣ Rules of Custom Hooks (VERY IMPORTANT 🚨)
    Custom hooks follow the same rules as React hooks

        ✅ Rule 1: Name must start with use
            useFetchData()
            useAuth()
            useCounter()

            ❌ Wrong

            fetchData()
            authHook()
            counter()

        ✅ Rule 2: Call hooks only at the TOP level

            ✔ Correct
                function useExample() {
                    const [state, setState] = useState(0);
                }
            ❌ Wrong
                function useExample() {
                    if (true) {
                        useState(0); // ❌
                    }
                }

            👉 No if, for, while, or nested functions

        ✅ Rule 3: Call custom hooks only inside
            React components
            Other custom hooks
            ❌ Wrong
                useCounter(); // outside component
            ✔ Correct
                function MyComponent() {
                    const counter = useCounter();
                }

        ✅ Rule 4: Custom hooks must be pure logic

            ✔ Do:
                state
                effects
                calculations
                API calls
            ❌ Don’t:
                return JSX
                use HTML

👉 Custom hooks do not render UI
        
*/


/*
        4️⃣ Situations to Use Custom Hooks (MOST IMPORTANT PART)
            Use a custom hook when 👇
            🟢 1. Logic is repeated in multiple components
                Example:
                    Fetching data
                    Loading + error handling
                    Pagination logic
                        useFetch(url)
            🟢 2. Component is becoming too large
                If component has:
                    many useState
                    many useEffect
                👉 Move logic into a custom hook

            🟢 3. Separation of concerns
                Component → UI
                Hook → logic
                    Component = what to show
                    Hook = how it works
            🟢 4. Complex side effects

*/


/*
    6️⃣ Mental Checklist (Easy to Remember 🧠)
        Ask yourself:
            Am I repeating this logic?
            Does this logic use React hooks?
            Can this be reused?
            Will this make component cleaner?
            👉 If YES, create a custom hook ✅

*/


/*
    7️⃣ One-Line Summary
    Custom Hook = reusable React logic extracted into a function that starts with use
*/