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

function clear() {
  const flights = db.getCollection('flights');
  flights.clear();
}

function getFlights() {
  const flights = db.getCollection('flights');
  return flights
    .chain()
    .find({})
    .data();
}

function addMarker(name, marker) {
  const flights = db.getCollection('flights');
  const flight = flights.by('name', name);
  flight.markers.push(marker);
  flights.update(flight);
}

function log(...msg) {
  console.log('[DATABASE]:', ...msg);
}

module.exports = { createDatabase, newFlight, clear, getFlights, addMarker };
