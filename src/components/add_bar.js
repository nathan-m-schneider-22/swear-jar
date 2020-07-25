import React, { Component } from 'react';

class AddBar extends Component {
  constructor(props) {
    super(props);

    this.state = { newtext: '' };
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChange = (event) => {
    this.setState({ newtext: event.target.value });
  }

  render() {
    return (
      <div id="add-bar">
        <input id="add-text" onChange={this.onInputChange} value={this.state.newtext} />
        <button id="add-button" type="button" onClick={() => this.props.handleClick(this.state.newtext)}> Add Note </button>
      </div>
    );
  }
}

export default AddBar;
