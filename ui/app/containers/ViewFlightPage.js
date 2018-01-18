// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles, Grid, List, ListItem, Typography, Paper } from 'material-ui';
import axios from 'axios';

import MapComponent from '../components/MapComponent';

import getDeviceLocation from '../utils/geolocation';
import * as AppActions from '../actions/app';

type Props = {
  app: { loadedFlight: {} },
  classes: {},
  match: { params: { name: string } },
  loadFlight: (name: string) => void
};

const styles = theme => ({
  root: {
    flex: 1,
    margin: 10
  },
  paperList: {
    padding: 16,
    height: 500,
    color: theme.palette.text.secondary,
    overflow: 'auto'
  },
  paperText: {
    padding: 16,
    height: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center'
  },
  paperData: {
    padding: 16,
    margin: '8px 0 8px 0',
    color: theme.palette.text.secondary
  }
});

class ViewFlightpage extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {};

    this.selectMarker = this.selectMarker.bind(this);
  }

  componentWillMount() {
    getDeviceLocation()
      .then(loc => this.setState({ deviceLocation: loc }))
      .catch(console.log);
  }

  componentDidMount() {
    this.props.loadFlight(this.props.match.params.name);
  }

  selectMarker(marker) {
    this.setState({selectedMarker: marker});
  }

  render() {
    const { classes } = this.props;
    const { loadedFlight } = this.props.app;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={4}>
            {loadedFlight.markers && loadedFlight.markers.length > 0 ? (
              <Paper className={classes.paperList}>
                <List>
                  {loadedFlight.markers.map((marker, index) => (
                    <ListItem button key={index} onClick={() => this.selectMarker(marker)}>
                      <Typography>
                        ({index}) -- lat: {marker.lat} , lng: {marker.lng}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : (
              <Paper className={classes.paperText}>
                <Typography className={classes.markersText}>No Markers</Typography>
              </Paper>
            )}
          </Grid>
          <Grid item xs={8}>
            <MapComponent
              center={this.state.deviceLocation || { lat: 0, lng: 0 }}
              zoom={15}
              markers={loadedFlight.markers || []}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMQPbpLgidGrX_Z7iuB3D5EDbCbCQjkH8&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '500px' }} />}
            />
          </Grid>
        </Grid>
        { this.state.selectedMarker &&
          <Paper className={classes.paperData}>
            <Grid container>
                <Grid item xs={4}>
                  <img src={`http://localhost:3000/resources/${this.props.app.loadedFlight.name}/${this.state.selectedMarker.image}`} />
                </Grid>
                <Grid item xs={8}/>
            </Grid>
          </Paper>
        }
      </div>
    );
  }
}

// Connect to state
function mapStateToProps(state) {
  return {
    app: state.app
  };
}

// Connect to actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

// Export
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ViewFlightpage));
