import { useState } from "react";
import UseState from './UseState';

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

// root component for our application
function App() {

  return(
    <div>
      <Steps />
      <UseState />
    </div>
  )
}


function Steps(){
  const [step, setStep] = useState(1);
  const [isOpen, setIsopen] = useState(true);


  const [test, setTest] = useState({ name: "Naresh" });

  // start with handle when you are attaching function to events
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((step) => step + 1);
    }

    // very bad practice
    // test.name ='Jupalle';

    // setTest({name:"Jupalle"})

  }

  const handleToggle = () => {
    setIsopen((openstate) => !openstate);
  }

  console.log("re redner it")

  return (

    <>
      <button type="button" onClick={handleToggle} className="close" >&times;</button>

        {isOpen && (
          <div className="steps">


          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ''}`}>1</div>
            <div className={`${step >= 2 ? "active" : ''}`}>2</div>
            <div className={`${step >= 3 ? "active" : ''}`}>3</div>
          </div>
  
          <p className="message">Step {step}: {messages[step - 1]} {test.name}</p>
  
          <div className="buttons">
            <button type="button" onClick={handlePrevious} style={{ background: '#7950f2', color: "#fff" }}>Previous</button>
            <button type="button" onClick={handleNext} style={{ background: '#7950f2', color: "#fff" }}>Next</button>
          </div>
        </div>
        )}
    </>
  )
}


// event handling

export default App



// What is State?

//  We have learned how to pass data into a component by using props, which is data coming from outside the component.
//  But what if a component needs to actually hold its own data and also hold it over time?
//  What if we want to make our app interactive, changing the UI as a result of an action? That's where state comes into play.

// State is basically data that a component can hold over time. 
// We use it for information that a component needs to remember throughout its lifecycle.
// Therefore, we can think of state as being the memory of a component. This analogy can be quite helpful.



// useState 
//   -  shouldn't inside the function
//   -  shouldn't inside the statements like if or for ..etc
//   -  shouldn't update state manually