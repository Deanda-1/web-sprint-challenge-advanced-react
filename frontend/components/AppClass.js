/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const URL = 'http://localhost:9000/api/result'
const themessage = ["You can't go left", "You can't go up", "You can't go down", "You can't go right", ""]
const coordinates = ["(1,1)", "(2,1)", "(3,1)",
                     "(1,2)", "(2,2)", "(3,2)",
                     "(1,3)", "(2,3)", "(3,3)"]
const dontmoveright = [2, 5, 8]
const dontmoveleft = [0, 3, 6]
const up = 2
const down = 6 
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
message: initialMessage,
email: initialEmail,
steps: initialSteps,
 index: initialIndex,
} 

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
      click: 4,
      finalemail: "",
      displayon: false
    }
  }
  getNextIndex = (direction) => {
    const { index } = this.state
    switch (direction) {
      case 'up':
        return (index < 3) ? index : index - 3
      case 'down':
        return (index > 5) ? index : index + 3
      case 'left':
        return (index % 3 === 0) ? index : index - 1
      case 'right':
        return ((index - 2) % 3 === 0) ? index : index + 1
    }
  }
  changingTheBLeft = (e) => {
   // dontmoveleft.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 1 })

    if (e.target.id === "left" && this.getNextIndex('left') === this.state.index) {
      this.setState({ ...this.state, click: 0, message: "You can't go left" })
    } else {
      this.setState({...this.state, steps: this.state.steps + 1, index: this.state.index - 1, click: 3, message: "" })
    }
  }
  changingTheBRight = (e) => {
    // dontmoveright.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 1 });
    if (e.target.id === "right" && dontmoveright.includes(this.state.index)) {
      this.setState({ ...this.state, click: 3, message: "You can't go right" })
    } else {
      this.setState({...this.state, steps: this.state.steps + 1, index: this.state.index + 1, click: 4, message: "" })
    }
  }
  changingTheBUp = (e) => {
    this.state.index <= up ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3 });
    if (e.target.id === "up" && this.state.index <= up) {
      this.setState({ ...this.state, click: 1, message: "You can't go up" })
    } else {
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3, click: 4, message: ""})
    }
  } 
   changingTheBDown = (e) => {
   // this.state.index >= down ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 3 });
    if (e.target.id === "down" && this.state.index >= down) {
      this.setState({ ...this.state, click: 2, message: "You can't go down" })
    } else {
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 3, click: 4, message: "" })
    }
   }
   reset = (e) => {
    this.setState({ ...this.state, steps: initialSteps, index: initialIndex, click: 4, displayon: false, email: initialEmail, message: "" })
   }
   onSubmitHandler = (e) => {
    e.preventDefault()
    const addstuff = { x: coordinates[this.state.index][1], y: coordinates[this.state.index][3], steps: this.state.steps, email: this.state.email };
    console.log(addstuff);
    
    axios.post("http://localhost:9000/api/result", addstuff)
    .then(resp => {
      const display = resp.data.message
      console.log(display);
      this.setState({ ...this.state, finalemail: display, email: "", displayon: true });
    })
    .catch(err => {console.log(err.response.data.message)
      this.setState({...this.state, finalemail: err.response.data.message, displayon: true, email: "" });
    })
   }
   onChangeHandler = (e) => {
    e.preventDefault()
    this.setState({ ...this.state, email: e.target.value })
   }
 
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {coordinates[this.state.index]}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time": "times"}</h3>
        </div>
        <div id="grid">
           {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{ this.state.displayon ? this.state.finalemail : this.state.message }</h3>
        </div>
        <div id="keypad">
          <button onClick={this.changingTheBLeft} id="left">LEFT</button>
          <button onClick={this.changingTheBUp} id="up">UP</button>
          <button onClick={this.changingTheBRight} id="right">RIGHT</button>
          <button onClick={this.changingTheBDown} id="down">DOWN</button>
          <button onClick={this.reset} id="reset">RESET</button>
        
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <input value={this.state.email} onChange={this.onChangeHandler} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
        
      </div>
    )
  }
}
