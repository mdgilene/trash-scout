// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import markers from './markers';

const rootReducer = combineReducers({
  markers,
  router
});

export default rootReducer;
