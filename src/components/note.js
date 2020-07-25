import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import marked from 'marked';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
  }

  onDrag = (e, data) => {
    this.props.handleDrag(e, data, this.props.id);
  }

  toggleEditing = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
    this.props.pushChanges(this.props.id);
  }

  editTitle = (event) => {
    this.props.updateTitle(this.props.id, event.target.value);
  }

  editContent = (event) => {
    this.props.updateContent(this.props.id, event.target.value);
  }

  renderEditing = () => {
    if (!this.state.isEditing) {
      return (
        <div className="note">
          <h1 className="note-title">{this.props.note.title}</h1>
          {/* <div className="handle">Drag from here</div> */}
          <button className="note-delete" onClick={() => this.props.delete(this.props.id)} type="button">Delete</button>
          <button className="note-edit" onClick={this.toggleEditing} type="button">Edit</button>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="noteBody" dangerouslySetInnerHTML={{ __html: marked(this.props.note.text || '') }} />
        </div>
      );
    } else {
      return (
        <div className="note">
          <input className="note-title" type="text" onChange={this.editTitle} value={this.props.note.title} />
          {/* <div className="handle">Drag from here</div> */}
          <button className="note-delete" onClick={() => this.props.delete(this.props.id)} type="button">Delete</button>
          <button className="note-edit" onClick={this.toggleEditing} type="button">Save</button>
          {/* eslint-disable-next-line react/no-danger */}
          <textarea className="noteBody" type="text" onChange={this.editContent} value={this.props.note.text} />
        </div>

      );
    }
  }

  render() {
    const jsx = this.renderEditing();
    return (
      <Draggable
        // handle=".handle"
        defaultPosition={{ x: 20, y: 20 }}
        cancel=".note input, .note button, .note textarea"
        position={{
          x: this.props.note.x, y: this.props.note.y, width: 0, height: 0,
        }}
        onDrag={this.onDrag}
        onStart={() => this.props.focus(this.props.id)}
        onStop={() => this.props.pushChanges(this.props.id)}
      >
        {jsx}
      </Draggable>
    );
  }
}

export default Note;
