import React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';

const components = require.context('./components', true, /index\.js$/);
const reducers = {};

components.keys().forEach((path) => {
  const name = path.split('/')[1];
  const component = components(path);
  if (component.reducer) {
    reducers[name] = component.reducer;
  }
})

// Import global Photon Styles
import './photon/dist/css/photon.css';

// Since we are using HtmlWebpackPlugin WITHOUT a template, we should create our own root node in the body element before rendering into it
let root = document.createElement('div');
root.id = "root";
document.body.appendChild(root);

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  routerMiddleware(history),
  logger,
  thunk
]


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(...middleware))
);

render(
  <Provider store={ store }>
    { /* ConnectedRouter will use the store from Provider automatically */ }
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
