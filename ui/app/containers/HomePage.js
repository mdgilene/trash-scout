// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Paper, List, ListItem, Typography, withStyles } from 'material-ui';
import Button from 'material-ui/Button';

import * as FlightsActions from '../actions/flights';

type Props = {
  flights: [],
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

class HomePage extends Component<Props> {
  props: Props;

  render() {
    const { flights, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography type="headline">Open an Existing Flight</Typography>
              <Typography type="headline">Or</Typography>
              <Button
                raised
                color="primary"
                component={Link}
                to="newflight"
              >
                Create a new Flight
              </Button>
              <List>
                {flights.map(flight => (
                  <ListItem button>
                    <Typography>{flight.name}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    flights: state.flights
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FlightsActions, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
