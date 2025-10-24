import { useEffect, useLayoutEffect, useRef, useState } from "react";

import './App.css'

function App() {

  return (
    <>
        <TimerComponent />
    </>
  )
}

export default App



function TimerComponent() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    // console.log("Component rendered", renderCount.current, "times");
    console.log("Component rendered current value", renderCount.current, "times");
  });

  // useEffect(() => {
  //   console.log("Effect runs only on mount");
  //   return () => console.log("Cleanup on unmount");
  // }, []);

  useLayoutEffect(() => {
    console.log("Component rendered previous value", renderCount.current, "times");
  })

  return (
    <div>
      <p>Count: {count}</p>
      <p>Renders: {renderCount.current}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
