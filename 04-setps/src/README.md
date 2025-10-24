# 📘 React `useState` Hook – Complete Guide

The `useState` hook is a fundamental React feature that allows you to manage state in functional components. This guide covers how to use it with all major data types, update patterns, and best practices.

---

## 🔹 What is `useState`?

- A React hook to declare **state variables** in functional components.
- Tracks changes in value over time and **automatically re-renders** the UI when updated.

### ✅ Basic Syntax

const [state, setState] = useState(initialValue);

### 🔹 Examples for All Data Types

## 1️⃣ Primitive Values – string, number, boolean

const [name, setName] = useState("Naresh");
const [age, setAge] = useState(25);
const [isActive, setIsActive] = useState(true);

// Updates
setName("Raj");
setAge(age + 1);
setIsActive(!isActive);

## 2️⃣ Array


const [items, setItems] = useState(["apple", "banana"]);

// Add item
setItems([...items, "orange"]);

// Remove item
setItems(items.filter(item => item !== "banana"));

// Update specific item
setItems(items.map(item => item === "apple" ? "grape" : item));

## 3️⃣ Object



const [user, setUser] = useState({
  name: "Naresh",
  age: 25,
  isActive: true
});

// Update age
setUser(prev => ({
  ...prev,
  age: prev.age + 1
}));

// Toggle active
setUser(prev => ({ ...prev, isActive: !prev.isActive }));


## 4️⃣ Nested Objects

const [profile, setProfile] = useState({
  name: "Naresh",
  address: {
    city: "Hyderabad",
    pincode: "500001"
  }
});

// Update nested city
setProfile(prev => ({
  ...prev,
  address: {
    ...prev.address,
    city: "Bangalore"
  }
}));


🔹 Ways to Update State

🟩 Direct Update
    setCount(count + 1);
🟨 Functional Update (Recommended)
    setCount(prev => prev + 1);



    

| ✅ Best Practice                  | 🔍 Description                          |
| -------------------------------- | --------------------------------------- |
| Do not mutate state              | Always use `setState()`                 |
| Use functional updates           | When new state depends on old state     |
| Clone arrays/objects             | Use spread `...` to ensure immutability |
| Avoid multiple dependent updates | Combine using functional update         |


