# React Hooks Deep Dive: `useEffect` and `useRef`

This guide will help you move from beginner to intermediate in React by mastering two essential hooks: **`useEffect`** (side effects) and **`useRef`** (references & persistence).

---

## 🔹 useEffect

`useEffect` lets you run **side effects** in functional components (logging, subscriptions, API calls, timers, etc.).

---

###  1. Basic Effect
Runs **after every render** (initial + updates).

    jsx
    useEffect(() => {
    console.log("Component rendered or updated");
    });

### 2. Dependency Array
Controls when the effect runs.

useEffect(() => {
  console.log("Runs once on mount");
}, []); // empty → only once

useEffect(() => {
  console.log("Runs whenever count changes");
}, [count]);

👉 Always list variables used inside the effect in the dependency array.


### 3. Cleanup Functions
    Cleanup removes event listeners, intervals, or subscriptions.
    useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup
    console.log("Timer cleared");
  };
}, []);

👉 Without cleanup, you risk memory leaks.

### 4. Data Fetching
A common real-world use.
    useEffect(() => {
    let isMounted = true;

    async function fetchData() {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await res.json();
        if (isMounted) {
        console.log(data);
        }
    }

    fetchData();

    return () => {
        isMounted = false; // avoid state updates if unmounted
    };
    }, []);
