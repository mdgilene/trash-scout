/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import NewFlightPage from './containers/NewFlightPage';
import ViewFlightPage from './containers/ViewFlightPage';

export default () => (
  <App>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/newflight" component={NewFlightPage} />
      <Route path="/view" component={ViewFlightPage} />
    </div>
  </App>
);
