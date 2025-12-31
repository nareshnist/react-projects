import { useState } from "react";
import "./App.css";

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

      <StepMessage step={step}>
          <div className="buttons">
             <Button bgColor="#e7e7e7" textColor="#333" onClick={() => alert("hello word")} >
            Learn How 
           </Button>
          </div>
      </StepMessage>
          
      <div className="buttons">
        <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious} >
          <span>👈 Previous</span>
        </Button>
        <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext} >
           
         Next <span>👉</span>
        </Button>
      </div>
    </div>}



{/* Example of using children props with steps message  */}

<StepMessage step={22} >
  <p>Lorem ipsum dolor sit amet.</p>
  <p>😍</p>
</StepMessage>

<StepMessage step={33} >
  <p>Lorem ipsum dolor sit amet.</p>
  <p>😭</p>
</StepMessage>

    </>
  );
}

// Configure the component content(placing icon before or after the contnet ) through chidlren props
function Button({textColor,bgColor,onClick,children}){
  return(
    <button
          type="button"
          style={{ backgroundColor:bgColor, color: textColor }}
          onClick={onClick}
        >
          {children}
        </button>
  )
}


// Component for step message with children props we can reuse anywhere in the app
function StepMessage({step,children}){
  return  <div className="message"> 
           <h3>Step {step} </h3>
           {children}
    </div>
}

export default App;
