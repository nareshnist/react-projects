function Progress({totalQuestions,index,points,maxPossiblePoints:totalPoints,answer}) {
    return (
        <header className="progress">


            <progress max={totalQuestions} value={index + Number(answer !== null)} ></progress>

            <p>Question <strong>{index + 1}</strong> / {totalQuestions} </p>
            <p><strong>{points}</strong> / {totalPoints}</p>
        </header>
    )
}

export default Progress
