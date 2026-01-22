function Questions({ question ,dispatch,answer}) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

function Options({ question,dispatch ,answer}) {
    const hasAnswered = answer !== null
  return (
    <div className="options">
      {question.options.map((option,index) => (
        <button disabled={hasAnswered} key={option} className={`btn btn-option ${index === answer ? 'answer' :'' } ${hasAnswered ? index === question.correctOption ? 'correct' :'wrong' : ''}`} onClick={() => dispatch({type:'newAnswer',payload:index})}>
          {option}
        </button>
      ))}
    </div>
  );
}

export default Questions;
