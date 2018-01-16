// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Paper, Typography, withStyles } from 'material-ui';
import Button from 'material-ui/Button';

import * as FlightsActions from '../actions/flights';


type Props = {
  classes: {}
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class NewFlightPage extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography type="headline">Create A New Flight</Typography>
              <Button
                raised
                color="primary"
                component={Link}
                to="/"
              >
              Back
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FlightsActions, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewFlightPage));
