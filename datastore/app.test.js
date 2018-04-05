const request = require("supertest");
const fs = require("fs");
const app = require("./app")("trash-scout-test", true);

const flights = [
  {
    name: "Flight 1",
    imageDensity: 30
  },
  {
    name: "Flight 2",
    imageDensity: 45
  },
  {
    name: "Flight 3",
    imageDensity: 12
  }
];

function populateDatabase() {
  return new Promise((resolve, reject) => {
    let done = 0;
    flights.forEach(flight => {
      request(app)
        .post("/flights")
        .send(flight)
        .end((err, res) => {
          done += 1;
          if (done === flights.length) return resolve();
          if (err) return reject(err);
        });
    });
  });
}

function removeDatabaseFields(doc) {
  const { _id, ...rest } = doc;
  return rest;
}

function byName(doc1, doc2) {
  return doc1.name < doc2.name;
}

beforeEach(() => {
  if (fs.existsSync("trash-scout-test.flights.db"))
    fs.unlinkSync("trash-scout-test.flights.db");
});

describe("GET /flights", () => {
  test("empty database", () => {
    return request(app)
      .get("/flights")
      .then(res => {
        expect(res.body).toEqual([]);
      });
  });

  test("all flights", () => {
    return populateDatabase().then(() => {
      return request(app)
        .get("/flights")
        .then(res => {
          expect(res.body.map(removeDatabaseFields).sort(byName)).toEqual(
            flights.sort(byName)
          );
        });
    });
  });
});

describe("GET /flights/:name", () => {
  test("non existent flight", () => {
    return request(app)
      .get("/flights/flight-doesnt-exist")
      .then(res => {
        expect(res.statusCode).toBe(404);
      });
  });

  test("single flight", () => {
    const flight = flights[0];
    return populateDatabase().then(() => {
      return request(app)
        .get(`/flights/${flight.name}`)
        .then(res => {
          expect(removeDatabaseFields(res.body)).toEqual(flight);
        });
    });
  });
});

describe("POST /flights", () => {
  test("basic flight", () => {
    return request(app)
      .post("/flights")
      .send(flights[0])
      .then(res => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("PUT /flights", () => {
  test("update non existent flight", () => {
    return request(app)
      .put("/flights")
      .send(flights[0])
      .then(res => {
        expect(res.statusCode).toBe(400);
      });
  });

  test("update flight", () => {
    return populateDatabase().then(() => {
      return request(app)
        .get("/flights/Flight 1")
        .then(res1 => {
          const newFlight = {
            ...res1.body,
            markers: []
          };
          return request(app)
            .put("/flights")
            .send(newFlight)
            .then(res2 => {
              expect(res2.body.numUpdated).toBe(1);
            });
        });
    });
  });
});
