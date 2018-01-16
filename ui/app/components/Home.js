// @flow
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Grid, Paper } from 'material-ui';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Button from 'material-ui/Button/Button';
import withStyles from 'material-ui/styles/withStyles';
import Typography from 'material-ui/Typography/Typography';

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

class Home extends Component<Props> {
  props: Props;

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs>
            <Paper className={classes.paper}>
              <Typography type="headline">Open an Existing Flight</Typography>{' '}
              <Typography type="headline">Or</Typography>
              <Button raised color="primary">
                Create a new Flight
              </Button>
              <List>
                <ListItem button>
                  <Typography>Flight 1</Typography>
                </ListItem>
                <ListItem button>
                  <Typography>Flight 1</Typography>
                </ListItem>
                <ListItem button>
                  <Typography>Flight 1</Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
