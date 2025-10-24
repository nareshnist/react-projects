import { useState } from "react";

export default function Stats({ items }) {
  if (!items.length) return <p className='stat'>Start Adding some items to your packing list</p>;

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  let [userName,setuserName] = useState('Pushpa kothhi');


  return <footer className='stats'>
    <em>
      {percentage === 100 ? 'You got everything! Ready to go ✈️' : ` 🧳 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}

    </em>

    <button onClick={() => {
        setuserName(()=> {
          return 'hhh'
        });
        console.log(userName)
    }}> updete</button>

    {userName}
  </footer>;
}
