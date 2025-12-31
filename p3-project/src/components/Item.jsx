


export function Item({ item, onDeleteItem, onUpdateItem }) {
  // child to parent comunication.
  return (
    <>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={(e) => onUpdateItem(item.id)} />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}{" "}
        </span>
        <button type="button" onClick={() => onDeleteItem(item.id)}>
          ❌
        </button>
      </li>
    </>
  );
}
