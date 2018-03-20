const loki = require("lokijs");

let db;

function createDatabase(callback) {
  db = new loki("trash-scout.json", {
    autoload: true,
    autoloadCallback: () => databaseInitialize(callback),
    autosave: true,
    autosaveInterval: 4000
  });
}

// implement the autoloadback referenced in loki constructor
function databaseInitialize(callback) {
  let flights = db.getCollection("flights");
  if (flights === null) {
    flights = db.addCollection("flights", { unique: "name", indices: "$loki" });
  }

  console.log("Database Initialized...");

  callback();
}

function newFlight(params) {
  const flights = db.getCollection("flights");

  if (flights.find({ name: params.name }).length) return false;

  const flight = {
    ...params,
    markers: []
  };

  flights.insert(flight);

  return true;

  log("New flight created", flight.name);
}

function getFlights() {
  const flights = db.getCollection("flights");
  return flights
    .chain()
    .find({})
    .data();
}

function getFlight(name) {
  const flights = db.getCollection("flights");
  return flights
    .chain()
    .find({ name })
    .data()[0];
}

function updateFlight(flight) {
  const flights = db.getCollection("flights");
  flights.update(flight);

  log("Flight", flight.$loki, "updated");
}

function addMarker(name, marker) {
  const flights = db.getCollection("flights");
  const flight = flights.by("name", name);

  if (!flight) return false;

  if (!flight.markers.includes(marker)) {
    flight.markers.push(marker);
  }

  flights.update(flight);
  return true;
}

function clear() {
  const flights = db.getCollection("flights");
  flights.clear();

  log("Flights cleared");
}

function log(...msg) {
  console.log("[DATABASE]:", ...msg);
}

module.exports = {
  createDatabase,
  newFlight,
  getFlights,
  getFlight,
  updateFlight,
  addMarker,
  clear
};
