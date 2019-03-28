import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor (props) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter () {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }

  render () {
    return (
      <>
        <h1>Counter</h1>
        <p>This is a simple example of a React component.</p>
        <p>Current count: <strong>{this.state.currentCount}</strong></p>
        <button className="bg-decathlon shadow-4 hover-bg-success white br3 pv3 ph6 pointer bn no-outline" onClick={this.incrementCounter}>Increment</button>
      </>
    );
  }
}
