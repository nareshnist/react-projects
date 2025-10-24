import { useEffect, useReducer, useState } from "react";


function reducer(state,action){
  console.log(state,action);

  switch(action.type){
    case "inc" :
      return  {
        ...state,
        count: state.count + state.step
        }
    case "dec" :
      return  {
        ...state,
        count: state.count  -  state.step
        }
    case "setCount" :
      return  {
        ...state,
        count : action.payload
        }
    case "setStep" :
      return  {
        ...state,
        step : action.payload
        }
    case "reset" :
      return  {
       count:0,
        step : 1
        }
    default :
        throw new Error("Unknown action")
  }
}

function DateCounter() {

  const initialState = { count : 0, step :1}
  const [state ,dispatch] = useReducer(reducer,initialState);
  const {count , step } = state;


  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:'dec'})
  };

  const inc = function () {
    dispatch({type:'inc'})
  };

  const defineCount = function (e) {
    dispatch({type:"setCount", payload:Number(e.target.value)});
  };

  const defineStep = function (e) {
    dispatch({type:"setStep", payload:Number(e.target.value)});
  };

  const reset = function () {
    dispatch({type:"reset"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>



      <ApiTesting />
    </div>
  );
}
export default DateCounter;



const intialState = {
  loading:false,
  data:[],
  error:false
}

const actionTypes = {
  init:'FETCH_INIT',
  success:'FETCH_SUCCESS',
  error:'FETCH_ERROR'
}

function apiStatus(state,action){
  switch(action.type){
    case actionTypes.init:
        return { ...state, loading:true}
    case actionTypes.success:
      return { ...state, loading:false, data:action.payload}  
    case actionTypes.error:
      return { ...state, loading:false, data:null ,error:true} 
    
    default :
      throw new Error("On default state");
  }
}

function ApiTesting(){

  
  const [apiData ,dispatch] = useReducer(apiStatus, intialState);

  const {
    loading,
    data,
    error,
  } = apiData;


  useEffect(()=>{
    
    dispatch({ type: actionTypes.init }); // start loading

      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response=>{
        if(!response.ok){
          throw new Error("an error occured");
        }
        return response.json()
      }
      )
      .then(data => dispatch({type:actionTypes.success,payload:data}))
      .catch(error=>{
        dispatch({type:actionTypes.error})
      })
  },[]);



  return (
    <>
          {
            loading && <h6> hey data retrival may take some time</h6>
          }

          {
            error && <h6> hey while fetching data serve has some issue please try after sometime</h6>
          }

          {
            data?.length > 0 && <ul>
              {
                data?.map(data => <h1 key={data.title}>{data.title}</h1>)
              }
              
            </ul>
          }
    </>
  )

}