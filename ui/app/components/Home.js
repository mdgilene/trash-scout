// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {
  flights: [],
  loadFlights: () => void,
  newFlight: (name: string) => void
};

export default class Home extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      newFlightName: ''
    };

    this.onFieldChange = this.onFieldChange.bind(this);
  }

  componentWillMount() {
    this.props.loadFlights();
  }

  onFieldChange(event) {
    this.setState({ newFlightName: event.target.value });
  }

  render() {
    const { newFlightName } = this.state;
    const { newFlight, flights } = this.props;

    return (
      <div>
        <div className={styles.header}>
          <h2>Trash Scout</h2>
          <Link to="/view">Go to /view </Link>
        </div>
        <div className={styles.main}>
          <div className={styles.col}>
            <h2>Open Existing Flight</h2>
            <ul>
              {flights.map(flight => (
                <li key={flight.$loki}>{flight.name}</li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <form onSubmit={() => newFlight(newFlightName)}>
              <h2>New Flight</h2>
              <label htmlFor="flightName">
                Flight Name
                <input id="flightName" type="text" value={newFlightName} onChange={this.onFieldChange} />
              </label>
              <button type="submit">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
