import { useState } from "react";
import './TextExpander.css'



function TextExpander({ children, collapsedText="Show more", expandedText="Show less", btnColor,collapsedWords = 10,  isExpanded = false ,className}) {
    const buttonStyle = {
        background: "none",
        border: "none",
        font: "inherit",
        cursor: "pointer",
        marginLeft: "6px",
        color: btnColor
      };
    const [btnToggle, setBtnToggle] = useState(isExpanded);
    return <>
        <div className={className}>
            <span>{btnToggle ?  children : `${children.split(' ').slice(1,collapsedWords).join(' ')}...`}</span>
            <button style={buttonStyle} type="button" onClick={() => {
                setBtnToggle(value => !value)
            }}>{btnToggle ? expandedText : collapsedText}</button>
        </div>
    </>
}


export default TextExpander;
