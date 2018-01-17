const Database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));

app.use(bodyParser.json());

app.get('/flights/:name/', (req, res) => {
  res.json(Database.getFlight(req.params.name));
});

app.get('/flights', (req, res) => {
  res.json(Database.getFlights());
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
  Database.addMarkers('TestFlight', [
    {
      lat: 39.393674,
      lng: -84.449653,
    },
    {
      lat: 39.392126,
      lng: -84.446967,
    },
    {
      lat: 39.39439,
      lng: -84.447439,
    },
    {
      lat: 39.393246,
      lng: -84.442461,
    },
    {
      lat: 39.392591,
      lng: -84.447418,
    },
    {
      lat: 39.393674,
      lng: -84.449653,
    },
    {
      lat: 39.392126,
      lng: -84.446967,
    },
    {
      lat: 39.39439,
      lng: -84.447439,
    },
    {
      lat: 39.393246,
      lng: -84.442461,
    },
    {
      lat: 39.392591,
      lng: -84.447418,
    },
    {
      lat: 39.393674,
      lng: -84.449653,
    },
    {
      lat: 39.392126,
      lng: -84.446967,
    },
    {
      lat: 39.39439,
      lng: -84.447439,
    },
    {
      lat: 39.393246,
      lng: -84.442461,
    },
    {
      lat: 39.392591,
      lng: -84.447418,
    },
    {
      lat: 39.393674,
      lng: -84.449653,
    },
    {
      lat: 39.392126,
      lng: -84.446967,
    },
    {
      lat: 39.39439,
      lng: -84.447439,
    },
    {
      lat: 39.393246,
      lng: -84.442461,
    },
    {
      lat: 39.392591,
      lng: -84.447418,
    },
  ]);

  app.listen(3000, () =>
    console.log('Server listening for HTTP requests on port 3000'),
  );
});
