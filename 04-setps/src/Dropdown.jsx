import { useState } from "react"

function DropDown({ text,onChange,tip }) {
    
    return (
        <div>
            <label> {text}</label> <select value={tip} onChange={(e) => onChange(+e.target.value)}>
            <option value="0">Dissatisfied(0%)</option>
        <option value="5">it was okay (5%)</option>
        <option value="10">it was good(10%)</option>
        <option value="20">Absolutely amazing!(20%)</option>
            </select>
        </div>
    )
}

export default DropDown