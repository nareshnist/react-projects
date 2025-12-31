
import { useState } from "react";


function Calculator() {

    const [billAmount, setBillAmount] = useState(0);
    const [servicePercentage, setServicePercentage] = useState(0);
    const [firendServicePercentage, setFriendServicePercentage] = useState(0);

    const tip = (servicePercentage + firendServicePercentage ) / 2;

    // example for state lifting
    const handleReset = () => {
        setBillAmount(0);
        setServicePercentage(0);
        setFriendServicePercentage(0);  
    }


    return <>
        <div style={{marginBottom:"3rem"}}>
             <BillInput billAmount={billAmount} onSetBillAmount={setBillAmount}   />
        </div>

       <div style={{marginBottom:"3rem"}}>
         <SelectPercentaghe servicePercentage={servicePercentage} onSetServicePercentage={setServicePercentage} >
                    How did you like the service?
        </SelectPercentaghe>
       </div>

            <div style={{marginBottom:"3rem"}}>
         <SelectPercentaghe servicePercentage={firendServicePercentage} onSetServicePercentage={setFriendServicePercentage} >
                How did your friend like the service?
        </SelectPercentaghe>

        <OutPut billAmount={billAmount} tip={tip} />

        <Reset onReset ={handleReset} />
       </div>
    </>

}

function BillInput({billAmount,onSetBillAmount}) {

    return  <>
         <label> How much was the bill ?</label>
        <input type="text" placeholder=" Enter Bill Amount" value={billAmount} onChange={(e) => onSetBillAmount(+e.target.value)}    />   
    </>
}


function SelectPercentaghe({servicePercentage ,children, onSetServicePercentage}) {

    return <>
        <label >{children}</label>
        <select name="" id="" value={servicePercentage} onChange={(e) =>onSetServicePercentage(+e.target.value) }>
            <option value="0">Dissatisfied (0%)</option>
            <option value="5"> it was okay (5%)</option>
            <option value="10">it was good (10%)</option>
            <option value="20">Absolutely amazing! (20%)</option>
        </select>
    </>
}   

function OutPut({billAmount,tip}) {

    return <div>
      You pay ${billAmount + tip} (${billAmount} + ${tip} tip)
  </div>

 
}

function Reset({onReset}) {

    


    return <>
        <button type="button" onClick={onReset}>RESET</button>
    </>
}


export default Calculator;