import React, { Component } from 'react';

class AddBar extends Component {
  constructor(props) {
    super(props);

    this.state = { newtext: '' };
  }

  // eslint-disable-next-line class-methods-use-this
  onInputChange = (event) => {
    console.log(event.target);
    this.setState({ newtext: event.target.value });
  }

  submit = (event) => {
    const text = this.state.newtext;
    this.setState({ newtext: '' });

    this.props.handleClick(text);
  }

  handleKey = (event) => {
    console.log(event.key);
    if (event.key === 'Enter') this.submit();
  }

  render() {
    const greeting = 'What\'s on your mind?';
    return (
      <div id="add-bar">
        <h3 className="greeting">{greeting}</h3>
        <input id="add-text" onChange={this.onInputChange} onKeyPress={this.handleKey} value={this.state.newtext} />
        <button id="add-button" type="button" onClick={this.submit}> Add Note </button>
      </div>
    );
  }
}

export default AddBar;
