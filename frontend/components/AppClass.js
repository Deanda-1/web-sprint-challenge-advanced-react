/* eslint-disable no-unused-vars */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const URL = 'http://localhost:9000/api/result'
const theMessage = ["You can't go left", "You can't go up", "You can't go down", "You can't go right", ""]
const coordinates = ["(1,1)", "(2,1)", "(3,1)",
                     "(1,2)", "(2,2)", "(3,2)",
                     "(1,3)", "(2,3)", "(3,3)"]
const dontMoveRight = [2, 5, 8]
const dontMoveLeft = [0, 3, 6]
const up = 2
const down = 6 
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

// const initialState = {
// message: initialMessage,
// email: initialEmail,
 // index: initialIndex,
 // steps: initialSteps,
//} 

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
  changingTheBLeft = (e) => {
    dontMoveLeft.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 1 });
    if (e.target.id === "left" && dontMoveLeft.includes(this.state.index)) {
      this.setState({ ...this.state, click: 0 })
    } else {
      this.setState({...this.state, steps: this.state.steps + 1, index: this.state.index - 1, click: 3 })
    }
  }
  changingTheBRight = (e) => {
    dontMoveRight.includes(this.state.index) ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index + 1 });
    if (e.target.id === "right" && dontMoveRight.includes(this.state.index)) {
      this.setState({ ...this.state, click: 3 })
    } else {
      this.setState({...this.state, steps: this.state.steps + 1, index: this.state.index + 1, click: 4 })
    }
  }
  changingTheBUp = (e) => {
    this.state.index <= up ? this.setState({ ...this.state }) : this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3 });
    if (e.target.id === "up" && this.state.index <= up) {
      this.setState({ ...AppClass.this.state, click: 1 })
    } else {
      this.setState({ ...this.state, steps: this.state.steps + 1, index: this.state.index - 3, click: 4})
    }
  } 
  
 }

  
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
