const loki = require('lokijs');

let db;

function createDatabase(callback) {
  db = new loki('trash-scout.json', {
    autoload: true,
    autoloadCallback: () => databaseInitialize(callback),
    autosave: true,
    autosaveInterval: 4000,
  });
}

// implement the autoloadback referenced in loki constructor
function databaseInitialize(callback) {
  let flights = db.getCollection('flights');
  if (flights === null) {
    flights = db.addCollection('flights', { unique: 'name', indices: '$loki' });
  }

  console.log('Database Initialized...');

  callback();
}

function newFlight(name) {
  const flights = db.getCollection('flights');

  const flight = {
    name,
    markers: [],
  };

  const insertedFlight = flights.insert(flight);

  log('New flight', name, 'created with id:', insertedFlight.$loki);
}

function getFlights() {
  const flights = db.getCollection('flights');
  return flights
    .chain()
    .find({})
    .data();
}

function getFlight(name) {
  const flights = db.getCollection('flights');
  return flights
    .chain()
    .find({ name })
    .data()[0];
}

function updateFlight(flight) {
  const flights = db.getCollection('flights');
  flights.update(flight);

  log('Flight', flight.$loki, 'updated');
}

function addMarkers(name, markers) {
  const flights = db.getCollection('flights');
  const flight = flights.by('name', name);

  let added = 0;
  markers.forEach(marker => {
    // No duplicate markers, if you want to update a marker then use a different API call
    if (!flight.markers.map(marker => marker.id).includes(marker.id)) {
      flight.markers.push(marker);
      added = added + 1;
    }
  });

  flights.update(flight);

  log(added, 'markers added to flight', name);
}

function clear() {
  const flights = db.getCollection('flights');
  flights.clear();

  log('Flights cleared');
}

function log(...msg) {
  console.log('[DATABASE]:', ...msg);
}

module.exports = {
  createDatabase,
  newFlight,
  getFlights,
  getFlight,
  updateFlight,
  addMarkers,
  clear,
};
