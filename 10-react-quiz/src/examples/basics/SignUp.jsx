import { useReducer } from "react";


// Intermideate

const formInitialState = {
  userName: "",
  email: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, userName: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "RESET":
      return formInitialState;
    default:
      return state;
  }
};

function SignUp() {
  const [{ userName, email }, dispatch] = useReducer(reducer, formInitialState);

  return (
    <div>
      <form>
        <h2>Sign Up</h2>

        <label htmlFor="user-name">User Name:</label>
        <input
          type="text"
          id="user-name"
          value={userName}
          onChange={(e) => dispatch({ type: "SET_USERNAME", payload: e.target.value })}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
        />

        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>

        <p>
          <strong>Current State:</strong> {JSON.stringify({ userName, email })}
        </p>
      </form>
    </div>
  );
}

export default SignUp;

/**
 * 
 * 
 *      3️⃣ Why this is Intermediate
            Multiple related state fields → can’t handle easily with multiple useState.
            Centralized logic → all updates go through the reducer.
            Reset action → demonstrates multiple state updates at once.
            You could extend this for validations, dynamic fields, or async updates.
 */