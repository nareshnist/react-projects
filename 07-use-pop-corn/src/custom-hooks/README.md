# 📘 React Custom Hooks – Beginner Friendly Guide

This README explains what a custom hook is, the rules of custom hooks, and when to use them, in very simple terms.

---

## 1️⃣ What is a Custom Hook?

A custom hook is a JavaScript function that:
- Starts with `use`
- Uses one or more React hooks (useState, useEffect, etc.)
- Helps reuse logic across multiple components

A custom hook contains only logic, not UI.

---

### Example: Basic Custom Hook

function useCounter() {
  const [count, setCount] = React.useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}

Using the custom hook inside a component:

function Counter() {
  const { count, increment, decrement } = useCounter();

  return (
    <>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

---

## 2️⃣ Why Do We Need Custom Hooks?

Without custom hooks:
- Same logic repeated in multiple components
- Components become large and hard to read

With custom hooks:
- Logic is reusable
- Components stay clean
- Easier maintenance
- Better readability

---

## 3️⃣ Rules of Custom Hooks (VERY IMPORTANT 🚨)

Custom hooks follow the same rules as React hooks.

### Rule 1: Name must start with "use"

Correct:
- useFetch
- useAuth
- useCounter

Wrong:
- fetchData
- authHelper
- counterHook

---

### Rule 2: Call hooks only at the TOP level

Correct:
function useExample() {
  const [value, setValue] = useState(0);
}

Wrong:
function useExample() {
  if (true) {
    useState(0);
  }
}

No hooks inside if, for, while, or nested functions.

---

### Rule 3: Call custom hooks only inside components or other hooks

Correct:
function MyComponent() {
  const data = useCounter();
}

Wrong:
useCounter(); // outside component

---

### Rule 4: Custom hooks must not return JSX

Do:
- Manage state
- Handle side effects
- Perform calculations

Do NOT:
- Return HTML or JSX

Custom hooks are for logic only.

---

## 4️⃣ Situations to Use Custom Hooks

### 1. Reusing logic across components
Example:
- API calls
- Loading and error handling

### 2. Component becomes too large
If a component has many useState and useEffect calls, move logic into a custom hook.

### 3. Separation of concerns
- Component handles UI
- Hook handles logic

### 4. Handling complex side effects
Examples:
- window resize
- event listeners
- subscriptions

Examples:
- useWindowSize
- useOnlineStatus

### 5. Reusable business logic
Examples:
- authentication
- permissions
- feature flags

Examples:
- useAuth
- useUserRole

---

## 5️⃣ When NOT to Use a Custom Hook

Do not use a custom hook when:
- Logic is used only once
- Logic is very small
- It reduces readability

Not every function should be a hook.

---

## 6️⃣ Easy Mental Checklist

Ask yourself:
1. Am I repeating this logic?
2. Does this logic use React hooks?
3. Can this logic be reused?
4. Will this make the component cleaner?

If YES, create a custom hook.

---

## 7️⃣ One-Line Summary

Custom Hook = reusable React logic extracted into a function that starts with "use"



###### =======================================================================


# 📘 React Custom Hooks – Complete Practical Guide

This README covers everything discussed:
- What is a custom hook
- Rules of custom hooks
- When to use custom hooks
- Designing a reusable `useFetch`
- Handling search with `null`
- AbortController usage
- GET vs POST/PUT/PATCH/DELETE
- `useMutation` pattern
- Fetching data on button click (not on load)

This is written in a **real-world, production mindset**.

---

## 1️⃣ What is a Custom Hook?

A custom hook is a JavaScript function that:
- Starts with `use`
- Uses React hooks internally (`useState`, `useEffect`, etc.)
- Encapsulates reusable logic
- Does NOT return JSX

Custom Hook = reusable logic, not UI.

---

## 2️⃣ Why Custom Hooks?

Without custom hooks:
- Logic duplicated across components
- Large and hard-to-read components

With custom hooks:
- Reusable logic
- Clean components
- Easier maintenance
- Better separation of concerns

Component = UI  
Hook = Logic

---

## 3️⃣ Rules of Custom Hooks (Very Important)

1. Name must start with `use`
   - useFetch, useCounter, useAuth

2. Hooks must be called at the top level
   - No if, for, while, or nested calls

3. Custom hooks can be used only inside:
   - React components
   - Other custom hooks

4. Custom hooks must not return JSX
   - Logic only

---

## 4️⃣ When to Use Custom Hooks

Use a custom hook when:
- Logic is reused in multiple components
- Component becomes too large
- You want to separate UI and logic
- You handle side effects (API, events, subscriptions)
- You manage reusable business logic

Do NOT use a custom hook when:
- Logic is used only once
- Logic is very small
- It reduces readability

---

## 5️⃣ Generic useFetch (GET – Read Only)

This hook is designed to work across the entire app:
- Initial list
- Search
- Conditional fetch
- Abort previous requests

useFetch implementation:

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await fetch(url, {
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error('Error while fetching data');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, isLoading, error };
}

---

## 6️⃣ Search with null (Correct Pattern)

If search term is empty, API should NOT trigger.

Correct usage:

const url = searchTerm
  ? `/api/products?search=${searchTerm}`
  : null;

const { data, isLoading, error } = useFetch(url);

Why this works:
- When url is null → useEffect exits
- No unnecessary API calls
- Clean and predictable

---

## 7️⃣ GET vs MUTATIONS (Very Important Concept)

GET:
- Auto fetch
- Runs on mount or dependency change
- Safe and repeatable

POST / PUT / PATCH / DELETE:
- Triggered by user action
- Should NOT auto-run

Because behavior is different:
GET and MUTATIONS must use different hooks.

---

## 8️⃣ useMutation (POST / PUT / PATCH / DELETE)

This hook handles all write operations.

export function useMutation() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mutate = async ({ url, method, body, headers }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: body ? JSON.stringify(body) : null
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, data, error, isLoading };
}

---

## 9️⃣ useMutation Examples

POST (Create):
mutate({
  url: '/products',
  method: 'POST',
  body: { name: 'Laptop', price: 1000 }
});

PUT (Update):
mutate({
  url: `/products/${id}`,
  method: 'PUT',
  body: updatedProduct
});

PATCH (Partial update):
mutate({
  url: `/products/${id}`,
  method: 'PATCH',
  body: { price: 900 }
});

DELETE:
mutate({
  url: `/products/${id}`,
  method: 'DELETE'
});

---

## 🔟 Fetch Data on Button Click (Not on Load)

When data should load ONLY on user action,
do NOT use useEffect auto-fetch.

Correct pattern: manual fetch.

useFetch for manual fetch:

export function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (url, options = {}) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Fetch failed');

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, fetchData };
}

Usage:
- Call fetchData() on button click
- No automatic API calls

---

## 🧠 Mental Model (Remember This)

- Auto behavior → useEffect
- User action → function call
- GET → useFetch
- POST/PUT/PATCH/DELETE → useMutation
- No URL → no API call
- Hook = logic, Component = UI

---

## 🏁 Final Summary

✔ Your original useFetch idea is correct  
✔ Passing null to stop fetch is correct  
✔ AbortController usage is correct  
✔ Separate read and write hooks is best practice  
✔ Fetch-on-click should be manual, not automatic  

This design is scalable and production-ready.

---

End of README
