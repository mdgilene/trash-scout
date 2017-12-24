import React, { Component } from 'react';
import { remote } from 'electron';

import { Sidebar } from '../Sidebar';

class App extends Component {
  render() {
    return (
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">{ remote.app.getName() } - v{ remote.app.getVersion() }</h1>
        </header>
        <Sidebar />
        <Sidebar />
        <h2>{ this.props.counter }</h2>
        <button onClick={ () => this.props.increment() }>Increment</button>
      </div>
      );
  }
}

export default App;
