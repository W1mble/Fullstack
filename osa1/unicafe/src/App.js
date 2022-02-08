import React, { useState } from 'react'

const Header = () => <h1> {'Give feedback please.'} </h1>

const SubHeader = () => <h2> {'Statistics'} </h2>

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>

const StatisticLine  = ({text, value}) => {
  return (
    <>
    <td>{text}</td><td>{value}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + bad + neutral
  const avg = (good - bad) / all
  const pos = (100 * good) / all + ' %'

  return (
    <>
    <table>
    <tbody>
    <tr><StatisticLine text = "Good " value = {good}/></tr>
    <tr><StatisticLine text = "Neutral " value = {neutral} /></tr>
    <tr><StatisticLine text = "Bad " value = {bad} /></tr>
    <tr><StatisticLine text = "All " value = {all} /></tr>
    <tr><StatisticLine text = "Average " value = {avg} /></tr>
    <tr><StatisticLine text = "Positive " value = {pos} /></tr>
    </tbody>
    </table>

    </>
  )
}

const History = ({good, bad, neutral}) => {
  if ( good === 0 && bad === 0 && neutral === 0 ) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header/>
      <Button handleClick={() => setGood(good + 1)} text = "good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text = "neutral" />
      <Button handleClick={() => setBad(bad + 1)} text = "bad" />
      <SubHeader/>
      <History good = {good} neutral={ neutral} bad = {bad} />
    </div>
  )
}

export default App