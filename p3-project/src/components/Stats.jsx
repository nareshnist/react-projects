export function Stats({ items }) {

  if (!items.length) return <p className="stats"> <em>Start adding items to your packing list</em></p>;
  // example for derived state avoiding adding extra state variable.
  const numberOfItem = items.length;
  const numbefOfPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round(numbefOfPackedItems / numberOfItem) * 100;
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✨"
          : `💼 You have ${numberOfItem} items on your list, and you already packed ${numbefOfPackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
