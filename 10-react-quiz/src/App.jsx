import { useState ,useEffect, useReducer} from 'react'
import './index.css'
import DateCounter from './DateCounter'
import Header from './Header'
import MainComponent from './MainComponent';
import Loader from './Loader'
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';
import Counter from './examples/basics/Counter';
import SignUp from './examples/basics/SignUp';
import ShoppingCart from './examples/basics/ShoppingCart';

const initialState = {
  questions:[],
  
  // 'loading' , 'error' ,'ready' 'active' 'finished'
  status:'loading',
  index:0,
  answer:null,
  points:0,
  highscore:0,
  secondsRemaining:null,
}

const SECS_PER_QUESTION = 30;

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
    
    case 'start':
      return {
        ...state,
        status:'active',
        secondsRemaining:state.questions.length * SECS_PER_QUESTION 
      }
    case 'newAnswer' :
        const question = state.questions.at(state.index);
      return {
        ...state,
        answer:action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points
      }
    case 'nextQuestion' :
      return {
        ...state,
        index: state.index + 1,
        answer : null
      }
    case 'finish' :
      return {
        ...state,
        status:'finished',
        highscore: state.points > state.highscore ? state.points  : state.highscore
      }
    case 'reStart' :
      return {
        ...initialState,
        questions:state.questions,
        status:'ready',
      }
    
    case 'tick' :
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status:state.secondsRemaining === 0 ? 'finished' : state.status
      }

    default:
      throw new Error("Action unknow")
}

}

function App() {
  const [count, setCount] = useState(0);
  const [{status , questions ,index , answer,points ,highscore , secondsRemaining},dispatch] = useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((pre,cur) => pre + cur.points,0)
 


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

    {
      /* <DateCounter /> */
    }
        
    <div className="app">
            <Header />
            <MainComponent >

                {
                  status === 'loading' && <Loader />
                }

                {
                  status === 'error' && <Error />
                }

                {
                  status === 'ready' &&<StartScreen  totalQuestions={totalQuestions} dispatch={dispatch}/>
                }

                {
                  status === 'active' && (
                    <>
                      <Progress  totalQuestions={totalQuestions} index={index} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
                      <Question  question={questions[index]} dispatch={dispatch} answer={answer}/>
                        <Footer className=''>
                          <Timer  dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                          <NextButton dispatch={dispatch} answer={answer} index={index} totalQuestions={totalQuestions} />
                        </Footer>
                    </>
                  )
                }

                {
                  status ==='finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} dispatch={dispatch} />
                }

            </MainComponent>


            {/* Use Redcuer Examples */}

            {/* <Counter /> */}

            {/* Form Example */}

            {/* <SignUp /> */}

            {/* Shopping Cart */}
            <ShoppingCart />
       </div> 
    </>
  )
}

export default App
