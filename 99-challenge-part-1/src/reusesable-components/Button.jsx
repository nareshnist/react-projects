function Button({ type = 'button', label, onClick, children }) {
  return (
    <button type={type} onClick={onClick}>
      {label ? label : children}
    </button>
  );
}


// <Button label="Save" />
// <Button type="submit">Submit Form</Button>
// <Button onClick={() => alert('Hello!')}>Say Hello</Button>