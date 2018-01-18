// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

// Material-UI Theme
import { MuiThemeProvider, createMuiTheme, withTheme } from 'material-ui/styles';
import { blue } from 'material-ui/colors'

import Routes from '../routes';

type RootType = {
  store: {},
  history: {}
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    type: 'dark'
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
