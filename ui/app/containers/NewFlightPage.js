// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Paper, Typography, TextField, withStyles } from 'material-ui';
import Button from 'material-ui/Button';

import * as FlightsActions from '../actions/flights';

type Props = {
  classes: {},
  newFlight: (flightParams: FlightsActions.FlightParams) => void,
  history: {
    push: (path: string) => void
  }
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
  button: {
    margin: 8
  }
});

class NewFlightPage extends Component<Props> {
  props: Props;

  constructor() {
    super();

    this.state = {
      name: '',
      imageDensity: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit() {
    this.props.newFlight({
      name: this.state.name,
      imageDensity: Number(this.state.imageDensity)
    });
    this.props.history.push('/');
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography type="headline">Create A New Flight</Typography>
              <form>
                <TextField
                  label="Flight Name"
                  margin="normal"
                  fullWidth
                  onChange={(event) => this.handleChange('name', event.target.value)}
                />
                <TextField
                  label="Image Density (Pictures per Row)"
                  margin="normal"
                  fullWidth
                  type="number"
                  onChange={(event) => this.handleChange('imageDensity', event.target.value)}
                />
              </form>
              <Button
                raised
                color="primary"
                className={classes.button}
                component={Link}
                to="/"
              >
                Back
              </Button>
              <Button
                raised
                color="primary"
                className={classes.button}
                onClick={this.handleSubmit}
              >
                Submit
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
