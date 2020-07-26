import './style.scss';
import React, { Component } from 'react';
import { Map } from 'immutable';
import Note from './components/note';
import AddBar from './components/add_bar';
import * as db from './services/datastore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
    //   idCount: 0,
    };
  }

  componentDidMount() {
    db.fetchNotes((notes) => {
      console.log('notes', notes);
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  newNote = (title) => {
    const newNote = {
      title,
      text: '',
      x: 0,
      y: 0,
      zIndex: 0,
    };
    db.addNote(newNote);
  }

  focus = (id) => {
    const min = this.state.notes.min((a, b) => {
      if (a.zIndex < b.zIndex) { return -1; }
      if (a.zIndex > b.zIndex) { return 1; } else { return 0; }
    });
    db.focus(id, min.zIndex + 1);
  }

  handleDrag = (e, data, id) => {
    if (id) {
      this.setState((prevState) => ({
        notes: prevState.notes.update(id, (n) => { return { ...n, x: data.x, y: data.y }; }),
      }));
    }
  }

  deleteNote = (id) => {
    db.deleteNote(id);
  }

  updateContent = (id, body) => {
    this.setState((prevState) => ({
      notes: prevState.notes.update(id, (n) => { return { ...n, text: body }; }),
    }));
  }

  updateTitle = (id, title) => {
    this.setState((prevState) => ({
      notes: prevState.notes.update(id, (n) => { return { ...n, title }; }),
    }));
  }

  pushChanges = (id) => {
    const note = this.state.notes.get(id);
    console.log(id, note);

    db.pushChanges(id, note);
  }

  render() {
    const ordered = this.state.notes.sort((a, b) => {
      if (a.zIndex < b.zIndex) { return -1; }
      if (a.zIndex > b.zIndex) { return 1; } else { return 0; }
    });
    return (
      <div>
        <AddBar handleClick={this.newNote} />
        {/* eslint-disable-next-line max-len */}
        {ordered.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} delete={this.deleteNote} handleDrag={this.handleDrag} updateContent={this.updateContent} updateTitle={this.updateTitle} pushChanges={this.pushChanges} focus={this.focus} />)}
      </div>
    );
  }
}
export default App;
