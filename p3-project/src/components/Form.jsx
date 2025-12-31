import { useState } from "react";
function Form({ onAddItems }) {
  const [description, setDescription] = useState("Apple");
  const [quantity, setQuantity] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const item = {
      description,
      packed: false,
      quantity,
      id: Math.random(),
    };

    // lifting the state.
    onAddItems(item);

    console.log(item);

    setQuantity(1);
    setDescription("");
  };

  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need for your 😍 trip?</h3>
        <select
          onChange={(e) => setQuantity(Number(e.target.value))}
          value={quantity}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <option key={i + 1} value={i + 1}>
              
              {i + 1}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {}
        <button>Add</button>
      </form>
    </>
  );
}

export default Form