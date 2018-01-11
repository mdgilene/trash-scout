// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import flights from './flights';
import markers from './markers';

const rootReducer = combineReducers({
  flights,
  markers,
  router
});

export default rootReducer;
