const Database = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());

// Serve static image files
app.use('/resources', express.static('resources'));

// Get individual flight
app.get('/flights/:name/', (req, res) => {
  res.json(Database.getFlight(req.params.name));
});

// Get all flights
app.get('/flights', (req, res) => {
  res.json(Database.getFlights());
});

// Create new flight
// Format: application/json
/*
{
  name: string,
  imageDensity: number
}
*/
app.post('/flights', (req, res) => {
  Database.newFlight(req.body);
  res.status(200).send();
});

// Update flight
// Format application/json
// Must be a modified database entry, including all database metadata
app.put('/flights', (req, res) => {
  Database.updateFlight(req.body);
  res.status(200).send();
});


// Setup image storage middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(`resources/${req.params.name}`)) {
      fs.mkdirSync(`resources/${req.params.name}`);
    }
    return cb(null, `resources/${req.params.name}`);
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Add marker to flight
// Request format: form-data
// Fields:
// -- lat:            latitude
// -- lng:            longitude
// -- image:          image file name
// -- trashDetected:  true/false
// -- imageData:      binary image data, source name must be the same as the image field above.
app.post('/flights/:name', upload.single('imageData'), (req, res) => {
  Database.addMarker(req.params.name, {
    lat: +req.body.lat,
    lng: +req.body.lng,
    image: req.body.image,
    trashDetected: req.body.trashDetected == 'true'
  });
  res.status(200).send();
});

// TODO: Remove this.
// Delete all flights
app.delete('/flights', (req, res) => {
  Database.clear();
  res.status(200).send();
});

// Initilize database and start server.
Database.createDatabase(() => {
  console.log('Initilize http server now...');

  Database.clear();
  Database.newFlight({
    name: 'Test-Flight'
  });

  app.listen(3000, () =>
    console.log('Server listening for HTTP requests on port 3000'),
  );
});
