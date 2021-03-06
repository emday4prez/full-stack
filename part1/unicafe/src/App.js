import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
  
}
const Statistics = (props) => {
  let total = props.bad + props.good + props.neutral
  let average = ((props.good - props.bad) / 3)
  let positive = (props.good / total) * 100
  return (
    <>
     <h2>statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p> 
      <p>total {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
    </>
    
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+ 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
     
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App