// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles, AppBar, Toolbar, Typography, Reboot, Button } from 'material-ui';

type Props = {
  children: React.Node,
  app: {},
  router: {},
  classes: {}
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

export default withStyles(styles)(connect(mapStateToProps)(App));
