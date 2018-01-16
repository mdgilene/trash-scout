// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles, Button, Grid, List, ListItem, Typography } from 'material-ui';
import MapComponent from '../components/MapComponent';

import * as AppActions from '../actions/app';

type Props = {
  app: { loadedFlight: {} },
  classes: {},
  match: { params: { name: string } },
  loadFlight: (name: string) => void
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 10
  },
  paper: {
    padding: 16,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  button: {
    margin: 8
  },
  flex: {
    flex: 1
  }
});

class ViewFlightpage extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.loadFlight(this.props.match.params.name);
  }

  render() {
    const { classes } = this.props;
    const { loadedFlight } = this.props.app;

    console.log(loadedFlight);

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={2}>
            <List>
              {loadedFlight.markers && loadedFlight.markers.map(marker => (
                <ListItem><Typography>{marker.lat} , {marker.lng}</Typography></ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={10}>
            <MapComponent
              markers={[]}
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '100%' }} />}
              mapElement={<div style={{ height: '500px' }} />}
            />
          </Grid>
        </Grid>
        <Button
          raised
          color="primary"
          className={classes.button}
          component={Link}
          to="/"
        >
          Back
        </Button>
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
