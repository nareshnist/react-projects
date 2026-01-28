import { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <p>Count: {state.count}</p>
    </div>
  );
}

export default Counter;



/**
 * 
 *  *3️⃣ Basic Takeaways
        useReducer separates state logic from the component.
        dispatch triggers changes by sending an action object.
        Reducer is pure → it returns a new state, doesn’t mutate old state.
        For a simple counter, it might be overkill, but it’s good practice for more complex states.
 */
