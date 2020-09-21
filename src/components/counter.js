import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Counter extends Component {
  render() {
    return (
      <div className="name-container">
        <div className="counter-container">
          <p className="name">{this.props.name}</p>
          <p className="count">{this.props.value}</p>
        </div>
        <div className="button-container">
          <button className="increment" onClick={() => this.props.increment(this.props.name)} type="button"> Swear </button>
        </div>
      </div>
    );
  }
}

export default Counter;
