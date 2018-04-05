const Database = require("./database");
const Collection = require("./collection");

let db;

const mockDocument = {
  name: "test-flight",
  imageDensity: 20
};

const mockDocuments = [
  {
    name: "test-flight",
    imageDensity: 20
  },
  {
    name: "test-flight",
    imageDensity: 20
  },
  {
    name: "test-flight",
    imageDensity: 20
  },
  {
    name: "test-flight2",
    imageDensity: 245
  },
  {
    name: "test-flight",
    imageDensity: 20
  }
];

function removeDatabaseFields(doc) {
  const { _id, ...rest } = doc;
  return rest;
}

beforeAll(() => {
  db = new Database();
});

test("database exists", () => {
  expect(db).toBeInstanceOf(Database);
});

test("create collection", () => {
  db
    .createCollection("flights")
    .then(() => expect(db.collections.flights).toBeInstanceOf(Collection));
});

describe("collection actions", () => {
  beforeEach(() => {
    db.collections["flights"].clear();
  });

  test("clear", async () => {
    await db.collections["flights"].clear();
    const count = await db.collections["flights"].count();

    expect(count).toEqual(0);
  });

  test("insert", async () => {
    const newDoc = removeDatabaseFields(
      await db.collections.flights.insert(mockDocument)
    );

    expect(newDoc).toEqual(mockDocument);
  });

  test("insertAll", async () => {
    await db.collections.flights.insertAll(mockDocuments);
    const count = await db.collections.flights.count();

    expect(count).toEqual(mockDocuments.length);
  });

  test("find", async () => {
    await db.collections.flights.insertAll(mockDocuments);
    const queryResult = await db.collections.flights.find({
      name: "test-flight2"
    });

    expect(removeDatabaseFields(queryResult)).toEqual(mockDocuments[3]);
  });

  test("findAll", async () => {
    await db.collections.flights.insertAll(mockDocuments);
    const queryResults = await db.collections.flights.findAll({
      name: "test-flight"
    });

    expect(queryResults.map(result => removeDatabaseFields(result))).toEqual(
      mockDocuments.filter(doc => doc.name === "test-flight")
    );
  });

  test("update", async () => {
    await db.collections.flights.insertAll(mockDocuments);
    const flight = await db.collections.flights.find({ name: "test-flight2" });

    flight.imageDensity = 23;

    const numUpdated = await db.collections.flights.update(flight);
    const updatedFlight = await db.collections.flights.find({
      name: "test-flight2"
    });

    expect.assertions(2);
    expect(numUpdated).toEqual(1);
    expect(updatedFlight.imageDensity).toEqual(23);
  });

  test("count", async () => {
    await db.collections.flights.insert(mockDocument);
    const count = await db.collections.flights.count();

    expect(count).toEqual(1);
  });
});
