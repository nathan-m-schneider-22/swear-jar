import React, { Component } from 'react';
import Draggable from 'react-draggable'; // The default
import marked from 'marked';
import * as xss from 'xss';
// import TextareaAutosize from 'react-textarea-autosize';

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
    // dangerouslySetInnerHTML puts the site at risk from XSS attacks
    // The XSS library allows me sanitze your inputs to prevent people from emedding
    // dangerous code in my site!
    const dirtyTitle = this.props.note.title;
    const cleanedTitle = xss.filterXSS(dirtyTitle);
    const dirtyContent = this.props.note.text;
    const cleanedContent = xss.filterXSS(dirtyContent);

    if (!this.state.isEditing) {
      return (
        <div className="note">
          <h1 className="note-title">{cleanedTitle}</h1>
          {/* <div className="handle">Drag from here</div> */}
          <button className="note-delete" onClick={() => this.props.delete(this.props.id)} type="button"> <i className="fa fa-trash" /></button>
          <button className="note-edit" onClick={this.toggleEditing} type="button"> <i className="fa fa-edit" /> </button>
          {/* eslint-disable-next-line react/no-danger */}
          <div className="note-body" dangerouslySetInnerHTML={{ __html: marked(cleanedContent || '') }} />
        </div>
      );
    } else {
      return (
        <div className="note">
          <input className="note-title" type="text" onChange={this.editTitle} value={dirtyTitle} />
          {/* <div className="handle">Drag from here</div> */}
          <button className="note-delete" onClick={() => this.props.delete(this.props.id)} type="button"> <i className="fa fa-trash" /></button>
          <button className="note-edit" onClick={this.toggleEditing} type="button"> <i className="fa fa-save" /></button>
          {/* eslint-disable-next-line react/no-danger */}
          <textarea className="note-body" type="text" onChange={this.editContent} value={cleanedContent} />
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
