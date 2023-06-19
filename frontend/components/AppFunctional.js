/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

// Suggested initial states
const themessage = ["You can't go left", "You can't go up", "You can't go down", "You can't go right", ""]
const coordinates = ["(1,1)", "(2,1)", "(3,1)",
                     "(2,1)", "(2,2)", "(3,2)",
                     "(3,1)", "(3,2)", "(3,3)"]
const dontmoveright = [2, 5, 8]
const dontmoveleft = [0, 3, 6]
const up = 2
const down = 6
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(initialIndex)
  const [click, setClick] = useState(4)
  const [email, setEmail] = useState(initialEmail)
  const [display, setDisplay] = useState("")
  const [displayon, setdisplayon] = useState(false)
const clickable = (e) => {
 if (e.target.id === "right" && dontmoveright.includes(index)) {
  setClick(3)
 } else if (e.target.id === "up" && index <= up) {
  setClick(1)
 } else if (e.target.id === "left" && dontmoveleft(index)) {
  setClick(0)
 } else if (e.target.id === "down" && index >= down) {
  setClick(2)
 } else {
  setClick(4)
 } 
 return click
}
const changestepsleft = (e) => {
  e.preventDefault()
  dontmoveleft.includes(index) ? setSteps(steps) : setSteps(steps + 1)
  dontmoveleft.includes(index) ? setIndex(index) : setIndex(index - 1);
  clickable (e) 
}
const reset = (e) => {
  e.preventDefault();
  setSteps(initialSteps);
  setIndex(initialIndex)
  setClick(4)
  setdisplayon(false)
  setEmail(initialEmail)
}
const changestepsright = (e) => {
  e.preventDefault()
  dontmoveright.includes(index) ? setSteps(steps) : setSteps(steps + 1)
  dontmoveright.includes(index) ? setIndex(index) : setIndex(index - 1);
  clickable (e) 
}
const changestepsup = (e) => {
  e.preventDefault()
  index <= up ? setSteps(steps) : setSteps(steps + 1)
  index <= up ? setIndex(index) : setIndex(index - 3) 
  clickable(e)
}
const changestepsdown = (e) => {
  e.preventDefault()
  index >= down ? setSteps(steps) : setSteps(steps + 1)
  index >= down ? setIndex(index) : setIndex(index + 3) 
  clickable(e)
}
const onchangehandler = (e) => {
  e.preventDefault();
  setEmail(e.target.value) 
}
function onsubmithandler(e) {
  e.preventDefault();
  const addstuff = { x : coordinates[index][1], y: coordinates[index][3], steps : steps, email : email };
  axios.post("http://localhost:9000/api/result", addstuff)
  .then(resp => {
    const display = resp.data.initialMessage
    setDisplay(display)
    setdisplayon(true)
    setEmail("")
  }) 
  .catch(err => {console.log(err);
    setDisplay(err.response.data.message);
    setdisplayon(true);
    setEmail("")
  })
}

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {coordinates[index]}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? "time":"times"} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx ===  index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{displayon ? display : themessage[click]}</h3>
      </div>
      <div id="keypad">
        <button onClick={changestepsleft} id="left">LEFT</button>
        <button onClick={changestepsup} id="up">UP</button>
        <button onClick={changestepsright} id="right">RIGHT</button>
        <button onClick={changestepsdown} id="down">DOWN</button>
        <button onClick={reset} id="reset">RESET</button>
      </div>
      <form onSubmit={onsubmithandler}>
        <input value={email} onChange={onchangehandler} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
