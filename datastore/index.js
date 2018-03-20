const Database = require("./database");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());

// Serve static image files
app.use("/resources", express.static("resources"));

// Get individual flight
app.get("/flights/:name/", (req, res) => {
  res.json(Database.getFlight(req.params.name));
});

// Get all flights
app.get("/flights", (req, res) => {
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
app.post("/flights", (req, res) => {
  if (Database.newFlight(req.body))
    return res.status(200).json({ success: true });

  return res
    .status(400)
    .json({ message: "Flight with that name already exists" });
});

// Update flight
// Format application/json
// Must be a modified database entry, including all database metadata
app.put("/flights", (req, res) => {
  Database.updateFlight(req.body);
  res.status(200).json();
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
app.post("/flights/:name", upload.any(), (req, res) => {
  if (
    Database.addMarker(req.params.name, {
      lat: +req.body.lat,
      lng: +req.body.lng,
      image: req.body.image,
      trashDetected: req.body.trashDetected === "true"
    })
  )
    return res.status(200).json({ success: true });

  return res.status(500).json({ message: "Unable to add marker" });
});

// Initilize database and start server.
Database.createDatabase(() => {
  app.listen(3000, () =>
    console.log("Server listening for HTTP requests on port 3000")
  );
});
