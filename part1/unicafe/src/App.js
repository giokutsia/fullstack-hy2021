import React, { useState} from 'react'
const Statistics = (props) => {
  
  return(
    <div>
      
      <table>
        <tbody>
          <tr>
            <td>{props.name} {props.value} {props.sign} </td>
          </tr>
        </tbody>
        
        
      </table>
    </div>
  )
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 const feedbacks = (good === 0 && bad === 0 && neutral === 0) 
   
const allFeed = good+bad+neutral
const positvity = (good*100)/allFeed

  return (
    <div >
      <h1>give feedback</h1>
      <div>
        <button onClick={(e) => setGood(good+1)}>good</button>
        <button onClick={(e) => setNeutral(neutral+1)}>neutral</button>
        <button onClick={(e) => setBad(bad+1)}>bad</button>
      </div>
      <h2>statistics</h2>
      {feedbacks 
      ? <h4>no feedabcks</h4> 
      :   
      <div><Statistics 
          value={good}
          name={"good"}
        />
        <Statistics 
          value={neutral}
          name={"neutral"}
        />
        <Statistics 
          value={bad}
          name={"bad"}
        />
        <Statistics 
          value={good+bad+neutral}
          name={"All"}
        />
        <Statistics 
          value={(good-bad)/allFeed || 0}
          name={"AVG"}
        />
        <Statistics 
          value= {positvity}
          name={"posotivite"}
          sign={"%"}
        /></div>}
            
     
    </div>
  );
}

export default App;
