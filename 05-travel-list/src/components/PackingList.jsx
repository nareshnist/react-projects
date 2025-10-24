import { useState } from 'react';
import Item  from './Item';

export default function PackingList({ items, onDeleteItems, onUpdateItems, onClearItems }) {

  const [soryBy, setSoryBy] = useState("input");
  let sortedItems;

  if (soryBy === 'input') sortedItems = items;

  if (soryBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (soryBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item, index) => <Item item={item} key={item.id} onDeleteItems={onDeleteItems} onUpdateItems={onUpdateItems} />)}
      </ul>

      <div className="actions">
        <select value={soryBy} onChange={(e) => setSoryBy(e.target.value)}>
          <option value="input">Sory by input order</option>
          <option value="description">Sory by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button type="button" onClick={onClearItems}>Clear List</button>
      </div>

    </div>
  );
}
