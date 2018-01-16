import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';

type Props = {
  markers: []
};

class MarkerList extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selected: -1
    };
  }

  render() {
    return (
      <List>
        {this.props.markers.map((marker, index) => (
          <ListItem
            key={index}
            onClick={() => {
              this.setState({ selected: index });
            }}
          >
            lat: {marker.lat} lng: {marker.lng}
          </ListItem>
        ))}
      </List>
    );
  }
}

export default MarkerList;
