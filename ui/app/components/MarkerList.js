import React, { Component } from 'react';
import styles from './MarkerList.css';

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
      <ul className={styles.markerList}>
        {this.props.markers.map((marker, index) => (
          <li
            key={index}
            className={this.state.selected === index ? styles.selected : null}
            onClick={() => {
              this.setState({ selected: index });
            }}
          >
            lat: {marker.lat} lng: {marker.lng}
          </li>
        ))}
      </ul>
    );
  }
}

export default MarkerList;
