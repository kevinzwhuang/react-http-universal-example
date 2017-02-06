import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: 0
    }
    this.addCounter = this.addCounter.bind(this);
  }

  addCounter() {
    this.setState(state => ({ counter: state.counter + 1 }));
  }

  render() {
    return (
      <div>
        <h1>
          We rendered in react!
        </h1>
        <button onClick={ this.addCounter }>
          Add counter
        </button>
        <p>
          Count: { this.state.counter }
        </p>
      </div>
    )
  }
}
