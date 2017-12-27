// Electron remote
import { remote } from 'electron';

// React
import React from 'react';
import { render } from 'react-dom';

// Redux + Router
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware, routerReducer, push } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// Components
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { App } from './components/App';

const window = remote.getCurrentWindow().webContents;
window.$ = window.jQuery = require('jquery');

// Global Bootstrap Styles
import './bootstrap/css/bootstrap.css';
import './bootstrap/js/bootstrap';

const reducers = {};

// Retrieve all reducers from components
const components = require.context('./components', true, /index\.js$/);
components.keys().forEach((path) => {
  const name = path.split('/')[1];
  const component = components(path);
  if (component.reducer) {
    reducers[name] = component.reducer;
  }
});


// Build the middleware for intercepting and dispatching navigation actions
const history = createHistory();
const middleware = [
  routerMiddleware(history),
  logger,
  thunk
];

// Add Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Combine reducers and enhancers to create store
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(...middleware))
);

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild(root);

// Render React components to document
render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div>
        <Route exact path="/" component={ App } />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// Have to initilze history with root
store.dispatch(push('/'));
