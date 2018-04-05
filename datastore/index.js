const app = require("./app")("trash-scout");

app.listen(3000, () =>
  console.log("Server listening for HTTP requests on port 3000")
);
