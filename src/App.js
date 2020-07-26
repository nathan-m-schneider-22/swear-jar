import './style.scss';
import React, { Component } from 'react';
import { Map } from 'immutable';
import Note from './components/note';
import AddBar from './components/add_bar';
import * as db from './services/datastore';
import CategoryBar from './components/category_bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      notes: Map(),
      category: 'default',
      categories: ['default', 'todo', 'grocery'],
    };
  }

  componentDidMount() {
    db.fetchNotes(this.state.category, (notes) => {
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
    db.addNote(this.state.category, newNote);
  }

  focus = (id) => {
    const min = this.state.notes.min((a, b) => {
      if (a.zIndex < b.zIndex) { return -1; }
      if (a.zIndex > b.zIndex) { return 1; } else { return 0; }
    });
    db.focus(this.state.category, id, min.zIndex + 1);
  }

  handleDrag = (e, data, id) => {
    if (id) {
      this.setState((prevState) => ({
        notes: prevState.notes.update(id, (n) => { return { ...n, x: data.x, y: data.y }; }),
      }));
    }
  }

  deleteNote = (id) => {
    db.deleteNote(this.state.category, id);
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

    db.pushChanges(this.state.category, id, note);
  }

  selectCategory = (newCategory) => {
    console.log('updating category', this.state.category, newCategory);
    this.setState({ category: newCategory });

    db.fetchNotes(newCategory, (notes) => {
      // eslint-disable-next-line new-cap
      this.setState({ notes: Map(notes) });
    });
  }

  render() {
    const ordered = this.state.notes.sort((a, b) => {
      if (a.zIndex < b.zIndex) { return -1; }
      if (a.zIndex > b.zIndex) { return 1; } else { return 0; }
    });
    return (
      <div className="note-space">
        <AddBar handleClick={this.newNote} />
        <CategoryBar categories={this.state.categories} selectCategory={this.selectCategory} />
        {/* eslint-disable-next-line max-len */}
        {ordered.entrySeq().map(([id, note]) => <Note key={id} id={id} note={note} delete={this.deleteNote} handleDrag={this.handleDrag} updateContent={this.updateContent} updateTitle={this.updateTitle} pushChanges={this.pushChanges} focus={this.focus} />)}
      </div>
    );
  }
}
export default App;
