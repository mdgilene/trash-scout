// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Material-UI Theme
import { MuiThemeProvider, createMuiTheme, withTheme } from 'material-ui/styles';

import Routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

const theme = createMuiTheme({
  palette: {
    type: 'dark' // Switching the dark mode on is a single property value change.
  }
});

function Root({ store, history }: RootType) {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default withTheme()(Root);
