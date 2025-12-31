import { useState } from 'react';
import './FlashCards.css'

const questions = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript"
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components"
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX"
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props"
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook"
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronised with state?",
    answer: "Controlled element"
  }
];

function FlashCards (){

    const [selectedID,setSelectedID] = useState(null);

    const handleId = (id) => {
        setSelectedID(id !== selectedID ? id : null)
    }
    
    return (
        <div className='flashcards'>
            {
                questions.map((q,i) => <div key={q.id}  onClick={(_) =>handleId(q.id) } className={q.id === selectedID ? 'selected' :''}> 
                    <p>{q.id === selectedID ? q.answer : q.question }</p>
                 </div>)
            }
        </div>
    )


}

export default FlashCards;