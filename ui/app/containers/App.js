// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { withStyles, AppBar, Toolbar, Typography, Reboot } from 'material-ui';

type Props = {
  children: React.Node,
  app: {},
  classes: {}
};

const styles = () => ({
  flexitem: {
    flex: 1
  }
});

class App extends React.Component<Props> {
  props: Props;

  render() {
    const { app, classes } = this.props;

    return (
      <div id="app">
        <Reboot />
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" className={classes.flexitem}>Trash Scout</Typography>
            {app.loadedFlight && <Typography type="title">{app.loadedFlight.name}</Typography>}
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

export default withStyles(styles)(connect(mapStateToProps)(App));
