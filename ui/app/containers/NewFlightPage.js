// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, Paper, Typography, TextField, withStyles, Button } from 'material-ui';
import MapComponent from '../components/MapComponent';

import getDeviceLocation from '../utils/geolocation';

import * as FlightsActions from '../actions/flights';
import * as AppActions from '../actions/app';

type Props = {
  classes: {},
  app: {
    deviceLocation: {}
  },
  newFlight: (flightParams: FlightsActions.FlightParams) => void,
  history: {
    push: (path: string) => void
  },
  setDeviceLocation: (deviceLocation: {}) => void
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

  componentWillMount() {
    getDeviceLocation()
      .then(loc => this.props.setDeviceLocation(loc))
      .catch(console.log);
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
    const { deviceLocation } = this.props.app;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography type="headline">Create A New Flight</Typography>
              <form>
                <TextField
                  label="Flight Name"
                  margin="normal"
                  fullWidth
                  onChange={event => this.handleChange('name', event.target.value)}
                />
                <TextField
                  label="Image Density (Pictures per Row)"
                  margin="normal"
                  fullWidth
                  type="number"
                  onChange={event => this.handleChange('imageDensity', event.target.value)}
                />
              </form>
              <Button raised color="primary" className={classes.button} component={Link} to="/">
                Back
              </Button>
              <Button raised color="primary" className={classes.button} onClick={this.handleSubmit}>
                Submit
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <MapComponent
              center={
                deviceLocation || {
                  lat: 0,
                  lng: 0
                }
              }
              zoom={15}
              markers={[]}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMQPbpLgidGrX_Z7iuB3D5EDbCbCQjkH8&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={
                <div
                  style={{
                    height: '100%'
                  }}
                />
              }
              containerElement={
                <div
                  style={{
                    height: '100%'
                  }}
                />
              }
              mapElement={
                <div
                  style={{
                    height: '580px'
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ FlightsActions, AppActions }, dispatch);
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewFlightPage));
