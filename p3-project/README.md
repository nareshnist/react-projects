# P3 Project — FAR Away

This project demonstrates essential React concepts with simple examples.

---

## Rendering Lists

```jsx
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
```


## Conditional Styling

    <li className={item.packed ? "packed" : ""}>
    {item.name}
    </li>


###### Forms

### Controlled Component
const [value, setValue] = useState("");
<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

### Form Submit (Prevent Reload)
function handleSubmit(e) {
  e.preventDefault();
  console.log(value);
}

<form onSubmit={handleSubmit}>
  <button>Add</button>
</form>

###### Lifting State Up

### Parent Component

const [items, setItems] = useState([]);

function addItem(item) {
  setItems((items) => [...items, item]);
}

<Child onAddItem={addItem} />

### Child Component

function Child({ onAddItem }) {
  onAddItem(newItem);
}

### Child → Parent Communication

function Child({ setItems }) {
  setItems((items) => items.filter((item) => item.id !== id));
}

### Working with Arrays

## Add Item

setItems((items) => [...items, newItem]);

## Remove Item

setItems((items) => items.filter((item) => item.id !== id));


###### Exercise