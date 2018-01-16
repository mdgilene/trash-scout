const Database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url, req.ip);
  next();
});

app.use(bodyParser.json());

app.get('/flights', (req, res) => {
  if (req.query.name) {
    res.json(Database.getFlight(req.query.name));
  } else {
    res.json(Database.getFlights());
  }
});

app.post('/flights', (req, res) => {
  Database.newFlight(req.body);
  res.status(200).send();
});

app.put('/flights', (req, res) => {
  Database.updateFlight(req.body);
  res.status(200).send();
});

app.post('/flights/:name/markers', (req, res) => {
  Database.addMarkers(req.params.name, req.body);
  res.status(200).send();
});

app.delete('/flights', (req, res) => {
  Database.clear();
  res.status(200).send();
});

Database.createDatabase(() => {
  console.log('Initilize http server now...');

  Database.clear();
  Database.newFlight({ name: 'TestFlight', imageDensity: 16 });

  app.listen(3000, () =>
    console.log('Server listening for HTTP requests on port 3000'),
  );
});
