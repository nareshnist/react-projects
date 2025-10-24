import { useState } from "react"

function BillInput({amount,onChange}){

    return (
      <div>
       <span>How huch was the bill ?</span>  <input type="text" value={amount} onChange={(e) =>{
        onChange(+e.target.value)
       }} />
      </div>
    )
}

export default  BillInput