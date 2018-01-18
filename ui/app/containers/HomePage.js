// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Paper, List, ListItem, Typography, withStyles } from 'material-ui';
import Button from 'material-ui/Button';

import * as AppActions from '../actions/app';
import * as FlightsActions from '../actions/flights';

type Props = {
  flights: [],
  classes: {},
  loadFlights: () => void,
  unloadLoadedFlight: () => void
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
  },
  container: {
    margin: 10
  },
  small: {
    fontSize: '0.7em',
    margin: '0 0 5px 0'
  }
});

class HomePage extends Component<Props> {
  props: Props;

  componentWillMount() {
    this.props.loadFlights();
    this.props.unloadLoadedFlight();
  }

  render() {
    const { flights, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>
              <div className={classes.container}>
                <Typography type="headline">Open an Existing Flight</Typography>
                <Typography className={classes.small}>OR</Typography>
                <Button
                  raised
                  color="primary"
                  component={Link}
                  to="/newflight"
                >
                  Create a new Flight
                </Button>
              </div>
              <List>
                {flights.map(flight => (
                  <ListItem
                    button
                    key={flight.name}
                    component={Link}
                    to={`/view/${flight.name}`}
                  >
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
  return bindActionCreators({ ...AppActions, ...FlightsActions }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
