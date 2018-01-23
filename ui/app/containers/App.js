// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles, AppBar, Toolbar, Typography, Reboot, Button } from 'material-ui';
import getDeviceLocation from '../utils/geolocation';

import * as AppActions from '../actions/app';

type Props = {
  children: React.Node,
  app: {},
  router: {},
  classes: {},
  setDeviceLocation: (loc: {}) => void
};

const styles = () => ({
  grow: {
    flex: 1
  },
  button: {
    marginLeft: 30
  }
});

class App extends React.Component<Props> {
  props: Props;

  componentWillMount() {
    getDeviceLocation()
      .then(loc => this.props.setDeviceLocation(loc))
      .catch(console.log);
  }

  render() {
    const { app, router, classes } = this.props;

    return (
      <div id="app">
        <Reboot />
        <AppBar position="static">
          <Toolbar>
            <Toolbar className={classes.grow}>
              <Typography type="title">Trash Scout</Typography>
              {router.location.pathname.includes('/view/') && (
                <Button raised color="accent" className={classes.button} component={Link} to="/">
                  Back
                </Button>
              )}
            </Toolbar>
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
    app: state.app,
    router: state.router
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(App));
