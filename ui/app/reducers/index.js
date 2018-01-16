// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import app from './app';
import flights from './flights';
import markers from './markers';

const rootReducer = combineReducers({
  router,
  app,
  flights,
  markers,
});

export default rootReducer;
