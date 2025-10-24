import { useState ,useEffect, useReducer} from 'react'
import './index.css'
import DateCounter from './DateCounter'
import Header from './Header'
import MainComponent from './MainComponent'

const initialState = {
  questions:[],
  
  // 'loading' , 'error' ,'ready' 'active' 'finished'
  status:'loading'
}

function reducer (state,action) {

  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status:'ready'
      }
    case 'dataFailed' :
      return {
        ...state,
        status:'error'
      }
    
    default:
      throw new Error("Action unknow")
}

}

function App() {
  const [count, setCount] = useState(0);

  const [state,dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    fetch('http://localhost:9000/questions')
    .then(response => response.json())
    .then(response => {
      console.log(response)
      dispatch({type:'dataReceived',payload:response})
    })
    .catch(error => dispatch({type:"dataFailed"}))
  },[])

  return (
    <>
        {/* <DateCounter /> */}
       <div className="app">
            <Header />
            <MainComponent> 
                <p>1/15</p>
                <p>Question</p>
            </MainComponent>
       </div>
    </>
  )
}

export default App
