
# Steps Project – React Basics

This project covers the fundamentals of **event handling** and **state management** in React.

---

## 1. Handling Events in React

- Event names must be written in **camelCase**
  - Examples: `onClick`, `onMouseOver`
- Do **not call the function** while assigning it to an event
  - ❌ `onClick={handlePrevious()}`
  - ✅ `onClick={handlePrevious}`
- Event handler function names should start with `handle`
  - Examples: `handleNext`, `handlePrevious`, `handleClick`

---

## 2. State in React

- State is defined inside a component
- State is used in JSX
- State should be updated whenever data changes
- Declare state only at the **top level** of a component
  - ❌ Not inside functions, loops, or `if/else`
- Never modify state directly
- **State is immutable in React**

---

## 3. Updating State

### ❌ Wrong js
step = step + 1;

### ✅ Correct

  `setStep(step + 1);`

### ✅ Best Practice (Based on Previous State)
  `setStep((s) => s + 1);`


# Key Takeaways
  - cUse camelCase for React events

  - Pass function references, not function calls

  - Declare state only at the top level of components

  - Always update state using the setter function

    
