import { useState } from "react";
import Logo from "./assets/Logo";

import { PackingList } from "./components/PackingList";
import { Stats } from "./components/Stats";
import Form from "./components/Form";
import "./App.css";


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 11, packed: true },
];

function App() {
  const [items, setItems] = useState(initialItems);

  // Adding item to the Array
  // should not mutate the original state
  // alwas need to create new array.
  const handleAddItems = (item) => {
    setItems((items) => [...items, item]);
  };

  // removing the element from the Array
  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((curentItem) => curentItem.id !== id));
  };

  // Updating the element in the Array
  const handleUpdateItem = (id) => {
    setItems((items) =>
      items.map((curentItem) =>
        curentItem.id === id
          ? { ...curentItem, packed: !curentItem.packed }
          : curentItem
      )
    );
  };

  // removing all the items

  const handleClearlist = () => {
    if(confirm('Aew you sure want to delete all items?')){
      setItems([]);
    }
    
  }

  return (
    <>
      <div className="app">
        <Logo />
        <Form onAddItems={handleAddItems} />
        <PackingList
          items={items}
          onDeleteItem={handleDeleteItem}
          onUpdateItem={handleUpdateItem}
          onClearList={handleClearlist}
        />
        <Stats items={items} />
      </div>
    </>
  );
}

export default App;
