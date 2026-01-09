import { useEffect, useRef, useState } from "react"


/**
 * 🔁 Challenge 4 — Store Previous Value
    ❓ Task
        Display current count
        Display previous count
        Use useRef
        🧠 Hint
        Update ref inside useEffect
 */

function StorePrevious() {

  const [count, setCount] = useState(0);
  const previousCount = useRef(null);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
     previousCount.current = count;
  }, [count]);

  return (
    <div>
      <p>Current Count :{count}</p>
      <p>Previous Count: {previousCount.current}</p>
      <button type="button" onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
}

export default StorePrevious;
