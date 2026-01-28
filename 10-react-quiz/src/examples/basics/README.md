### React useReducer Examples: Basic → Intermediate → Advanced

---

## About useReducer

`useReducer` is a React hook used to manage **complex state logic** in a component. It is especially useful when:

* You have **multiple related state variables**.
* State updates **depend on previous state**.
* You want **centralized logic** for updating state.
* You want a more **predictable and scalable** way to manage state compared to multiple `useState` calls.

It works by defining a **reducer function** that takes the current state and an action object, and returns a new state. You then use `dispatch` to send actions that trigger state changes.

---

## 1️⃣ Basic Counter Example

```js
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
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>

      <p>Count: {state.count}</p>
    </div>
  );
}

export default Counter;
```

---

## 2️⃣ Intermediate Form Example

```js
import { useReducer } from "react";

const formInitialState = { userName: "", email: "" };

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

        <button type="button" onClick={() => dispatch({ type: "RESET" })}>Reset</button>

        <p><strong>Current State:</strong> {JSON.stringify({ userName, email })}</p>
      </form>
    </div>
  );
}

export default SignUp;
```

---

## 3️⃣ Advanced Shopping Cart Example

```js
import { useReducer } from "react";

const initialState = {
  products: [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Keyboard", price: 1500 },
    { id: 3, name: "Mouse", price: 800 },
    { id: 4, name: "Monitor", price: 12000 },
    { id: 5, name: "Headphones", price: 2500 },
  ],
  cartItems: [],
  totalCartItems: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const product = state.products[action.payload];
      const existing = state.cartItems.find((item) => item.id === product.id);

      let updatedCart;
      if (existing) {
        updatedCart = state.cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...product, quantity: 1 }];
      }

      return { ...state, cartItems: updatedCart, totalCartItems: state.totalCartItems + 1 };
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.cartItems.find((item) => item.id === action.payload);
      if (!itemToRemove) return state;

      let updatedCart;
      if (itemToRemove.quantity > 1) {
        updatedCart = state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        updatedCart = state.cartItems.filter((item) => item.id !== action.payload);
      }

      return { ...state, cartItems: updatedCart, totalCartItems: state.totalCartItems - 1 };
    }

    case "CLEAR_CART":
      return { ...initialState };

    default:
      return state;
  }
};

function ShoppingCart() {
  const [{ products, cartItems, totalCartItems }, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: index })}>Add to Cart</button>
          </li>
        ))}
      </ul>

      <h2>Cart Items</h2>
      {cartItems.length === 0 && <p>No items in cart</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Total Items: {totalCartItems}</h2>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear Cart</button>
    </div>
  );
}

export default ShoppingCart;

```
