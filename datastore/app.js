const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Database = require("./database");

const app = express();
let db;

app.use(bodyParser.json());

// Serve static image files
app.use("/resources", express.static("resources"));

// Get individual flight
app.get("/flights/:name", (req, res) => {
  db.collections.flights
    .find({ name: req.params.name })
    .then(flight => res.json(flight))
    .catch(() => res.status(404).json({ message: "Flight not found" }));
});

// Get all flights
app.get("/flights", (req, res) => {
  db.collections.flights
    .findAll({})
    .then(flights => res.json(flights || []))
    .catch(() => res.status(404).json({ message: "Unable to fetch flights" }));
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
  db.collections.flights
    .insert(req.body)
    .then(flight => res.json({ success: true, flight }))
    .catch(error => res.status(400).json({ success: false, error }));
});

// Update flight
// Format application/json
// Must be a modified database entry, including all database metadata
app.put("/flights", (req, res) => {
  db.collections.flights
    .update(req.body)
    .then(numUpdated => {
      if (numUpdated === 0)
        return res.status(400).json({
          message:
            "Flight does not exist, make sure to make a POST request first"
        });
      return res.json({ success: true, numUpdated });
    })
    .catch(err => res.status(500).json({ message: "Unable to update flight" }));
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

// Upload images for a flight
app.use("/flights/:name/images", upload.any());

module.exports = function(dbPath, testing = false) {
  // Only log if we are running the server outside the testing environment
  if (!testing) app.use(morgan("tiny"));

  // Create database and initlize flights collection
  db = new Database(path.join(__dirname, dbPath));
  if (!db.collections.flights) db.createCollection("flights");

  return app;
};
