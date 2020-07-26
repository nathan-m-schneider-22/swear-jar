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

  submit = (event) => {
    const text = this.state.newtext;
    this.setState({ newtext: '' });

    this.props.handleClick(text);
  }

  handleKey = (event) => {
    if (event.key === 'Enter') this.submit();
  }

  render() {
    const greeting = 'What\'s on your mind?';
    return (
      <div id="add-bar">
        <h3 className="greeting">{greeting}</h3>
        <input id="add-text" onChange={this.onInputChange} onKeyPress={this.handleKey} value={this.state.newtext} />
      </div>
    );
  }
}

export default AddBar;
