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

  newNote = (text) => {
    const newNote = {
      title: 'No Title',
      text,
      x: 0,
      y: 0,
      zIndex: 0,
    };
    db.addNote(newNote);
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
    db.pushChanges(id, note);
  }

  render() {
    return (
      <div>
        <AddBar handleClick={this.newNote} />
        {this.state.notes.entrySeq().map(([id, note]) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          <Note key={id} id={id} note={note} delete={this.deleteNote} handleDrag={this.handleDrag} updateContent={this.updateContent} updateTitle={this.updateTitle} pushChanges={this.pushChanges} />)}
      </div>
    );
  }
}
export default App;
