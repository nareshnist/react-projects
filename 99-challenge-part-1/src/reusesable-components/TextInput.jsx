function TextInput({ value, onChange }) {
  const [userinput, setuserinput] = useState('hello');

  const handleChange = (e) => {
    const inputValue = e.target.value;

    if (value !== undefined && value !== null) {
      onChange?.(inputValue);
    } else {
      setuserinput(inputValue);
    }
  };

  return (
    <input
      type="text"
      placeholder="Enter text..."
      value={value ?? userinput}
      onChange={handleChange}
    />
  );
}


// <TextInput value={userinput} />
// <TextInput /> 