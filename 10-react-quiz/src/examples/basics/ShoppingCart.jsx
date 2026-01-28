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

      return {
        ...state,
        cartItems: updatedCart,
        totalCartItems: state.totalCartItems + 1,
      };
    }

    case "REMOVE_FROM_CART": {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (!itemToRemove) return state;

      let updatedCart;
      if (itemToRemove.quantity > 1) {
        updatedCart = state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        updatedCart = state.cartItems.filter((item) => item.id !== action.payload);
      }

      return {
        ...state,
        cartItems: updatedCart,
        totalCartItems: state.totalCartItems - 1,
      };
    }

    case "CLEAR_CART":
      return { ...initialState };

    default:
      return state;
  }
};

function ShoppingCart() {
  const [{ products, cartItems, totalCartItems }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: index })}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>

      <h2>Cart Items</h2>
      {cartItems.length === 0 && <p>No items in cart</p>}
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
            <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Total Items: {totalCartItems}</h2>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear Cart</button>
    </div>
  );
}

export default ShoppingCart;


/*
    3️⃣ Why This is Advanced

Complex State
    products + cartItems + totalCartItems
    Multiple related states in one reducer

Dependent updates
    totalCartItems depends on adding/removing cart items
    Updating quantity if the item already exists
Centralized Logic
    All cart logic is in the reducer → easy to maintain
Scalable
    Can easily add discounts, subtotal, taxes, etc.

*/