// @flow
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar/Toolbar';
import Typography from 'material-ui/Typography/Typography';
import withTheme from 'material-ui/styles/withTheme';
import Reboot from 'material-ui/Reboot/Reboot';

type Props = {
  children: React.Node
};

class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div id="app">
        <Reboot />
        <AppBar position="static">
          <Toolbar>
            <Typography type="title">Trash Scout</Typography>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

export default withTheme()(App);
