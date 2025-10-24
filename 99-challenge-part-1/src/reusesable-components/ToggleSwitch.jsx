function ToggleSwitch({
    ToggleOnLable,
    ToggleOffLable,
    isChecked,
    onToggle,
    defaultChecked = false,
  }) {
    const [isToggle, setIsToggle] = useState(defaultChecked);
  
    const condition = isChecked !== undefined ? isChecked : isToggle;
  
    const toggleOnTxt = ToggleOnLable || 'Expand Text';
    const toggleOffTxt = ToggleOffLable || 'Collapse Text';
  
    useEffect(() => {
      console.log(isToggle, 'from child component');
    });
  
    const handleChange = (e) => {
      const newValue = !condition;
  
      if (isChecked !== undefined && typeof isChecked === 'boolean') {
        onToggle?.(newValue);
      } else {
        setIsToggle(newValue);
      }
    };
  
    return (
      <button type="button" onClick={handleChange}>
        {condition ? toggleOnTxt : toggleOffTxt}
      </button>
    );
  }
/**
    <ToggleSwitch
        ToggleOnLable="On"
        ToggleOffLable="Off"
        onToggle={setIsToggle}
      />

      <ToggleSwitch />
 */