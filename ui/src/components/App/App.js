import React, { Component } from 'react';
import { remote } from 'electron';


class App extends Component {
  render() {
    return (
      <div>
        <header className="toolbar toolbar-header">
          <h1 className="title">{ remote.app.getName() } - v{ remote.app.getVersion() }</h1>
        </header>
      </div>
      );
  }
}

export default App;
