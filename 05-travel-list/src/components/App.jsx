
import { useState } from 'react';
import Logo from './Logo';
import Form from './Form';
import  PackingList  from './PackingList';
import Stats from './Stats';


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Socks", quantity: 12, packed: true },
];

function App() {

  const [items,setItems] = useState(initialItems);
 


  // Adding items to  array 
  function handleAddItems(item){
    setItems(items  => [...items, item]);
  }

  // removing from array 
  function handleRemoveItems(id){
    //const itemsAfterDelete = items.filter((i) => item.id !== i.id);
    setItems(items => items.filter(item => item.id !== id));
  }

  // updating the item 
  function handleToggleItem(id){
    setItems(items => items.map(item => item.id === id ? {...item, packed:!item.packed} : item));
  }

  // clear

  function handleClearList(){
    const confirm = window.confirm("Are you sure you want to delete all items");
    if(confirm) setItems([]);
   
  }

  return (
    <div className='app'>
      <Logo />
      <Form  onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItems ={handleRemoveItems} onUpdateItems= {handleToggleItem} onClearItems={handleClearList}/>
      <Stats items={items} />
    </div>
  )

}



export default App
