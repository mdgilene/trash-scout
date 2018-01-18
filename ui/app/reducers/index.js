// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import flights from './flights';

const rootReducer = combineReducers({
  router,
  app,
  flights,
});

export default rootReducer;
