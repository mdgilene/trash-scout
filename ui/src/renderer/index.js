import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';

import createHistory from 'history/createBrowserHistory';

import { routerReducer, routerMiddleware, push } from 'react-router-redux';

import logger from 'redux-logger';

//import reducers from './reducers' // Or wherever you keep your reducers

import Routes from './Routes';

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [
  routerMiddleware(history),
  logger
];

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    //    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(...middleware)
);

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<Routes history={ history } store={ store } />, document.getElementById('app'));