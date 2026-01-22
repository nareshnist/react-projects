import { useEffect } from "react"

function Timer({dispatch,secondsRemaining}) {

    const minis = Math.floor(secondsRemaining / 60);
    const seconds  = secondsRemaining % 60;

    useEffect(() => {
      const intervalId =   setInterval(() =>{
            dispatch({type:'tick'})
        }, 1000)
    
        return () => {
            clearInterval(intervalId);
        }

    },[dispatch]);

    return (
        <div className="timer">
           {minis < 10 && '0'} {minis} : {seconds < 10 && '0'} {seconds}
        </div>
    )
}

export default Timer
