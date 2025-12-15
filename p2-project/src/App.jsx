import { useState } from "react";
import "./App.css";
import Counter from "./date-counter";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
  const [step,setStep] = useState(1);
  const [isOpen ,setIsOpen] = useState(true);


  // just an example please check in below
  const [test] = useState({name:"Naresh"})

  const handlePrevious = () => {
    if(step > 1) setStep((s) => s - 1);
  }

  const handleNext = () => {


    // will not work for batch.
    //  if(step < 3){
    //   setStep(step + 1)
    //   setStep(step + 1)
    //  };

    if(step < 3)setStep((S) => S + 1);

    // normal way of updating js varibale
    // step = step + 1;

    // BAD PRACTISE
    test.name = "Nani" // it work but very bad practise in react 
  }

  const handleToggle = () => {

    // updating state based on current state
    // setIsOpen(!isOpen);

    setIsOpen(open => !open);
  }


  return (
    <>
       <button className="close" onClick={handleToggle}>X</button>
    {isOpen &&  <div className="steps">
     
      <div className="numbers">
        <div className={step >= 1 ? 'active': ''}>1</div>
        <div className={step >= 2 ? 'active': ''}>2</div>
        <div className={step >= 3 ? 'active': ''}>3</div>
      </div>

      <p className="message"> Step {messages[step - 1]}</p>

      <div className="buttons">
        <button
          type="button"
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handlePrevious}
        >
          Privious
        </button>
        <button
          type="button"
          style={{ backgroundColor: "#7950f2", color: "#fff" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>}

    <Counter />
    </>
  );
}

export default App;
