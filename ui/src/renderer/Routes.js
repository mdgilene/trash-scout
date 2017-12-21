import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router';

import App from './components/App';

class Routes extends Component {
  render() {
    return (
      <Provider store={ this.props.store }>
        <ConnectedRouter history={ this.props.history }>
          <div id='root'>
            <Route exact path='/' component={ App } />
          </div>
        </ConnectedRouter>
      </Provider>
      );
  }
}

export default Routes;