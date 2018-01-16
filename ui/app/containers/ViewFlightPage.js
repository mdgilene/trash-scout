// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withStyles, Button } from 'material-ui';

import * as MarkersActions from '../actions/markers';

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
  },
  button: {
    margin: 8
  }
});

class ViewFlightpage extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;

    return (
      <div>
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
    markers: state.markers
  };
}

// Connect to actions
function mapDispatchToProps(dispatch) {
  return bindActionCreators(MarkersActions, dispatch);
}

// Export
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ViewFlightpage));
