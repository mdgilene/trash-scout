const Database = require('./database');
const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Got request');
  next();
});

app.get('/flights', (req, res) => {
  Database.addMarker('Flight-1234', { lat: 0, lng: 0 });

  res.json(Database.getFlights());
});

Database.createDatabase(() => {
  console.log('Initilize http server now...');

  Database.clear();
  Database.newFlight('Flight-1234');
  Database.newFlight('Flight-123asdfasdf4');
  Database.newFlight('Flight-123cxzvzxcv4');
  Database.newFlight('Flight-123gjhghj4');
  Database.newFlight('Flight-1234234234');

  app.listen(3000, () =>
    console.log('Server listening for HTTP requests on port 3000'),
  );
});
