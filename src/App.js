import './style.scss';
import React, { Component } from 'react';
import { Map } from 'immutable';
import * as db from './services/datastore';
import Counter from './components/counter';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // eslint-disable-next-line new-cap
      counts: Map(),
    };
  }

  componentDidMount() {
    db.fetchcounts((counts) => {
      // eslint-disable-next-line new-cap
      this.setState({ counts: Map(counts) });
    });
    console.log(this.state.counts);
  }

  increment = (name) => {
    console.log(this.state.counts);
    db.pushChanges(name, this.state.counts.get(name) + 1);
  }

  render() {
    console.log(this.state.counts.toJS());
    const vals = [];

    // eslint-disable-next-line guard-for-in
    console.log(vals);
    return (
      <div className="top-container">
        <h1 className="title">Swear Jar</h1>
        {this.state.counts.entrySeq().map(([name, value]) => <Counter name={name} value={value} key={name} increment={this.increment} />)}
      </div>
    );
  }
}
export default App;
