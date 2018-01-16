/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import NewFlightPage from './containers/NewFlightPage';
import ViewFlightPage from './containers/ViewFlightPage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/newflight" componet={NewFlightPage} />
      <Route exact path="/view" component={ViewFlightPage} />
    </Switch>
  </App>
);
