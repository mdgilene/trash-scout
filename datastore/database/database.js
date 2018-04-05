const Collection = require("./collection");

module.exports = class Database {
  constructor(path) {
    this.dbPath = path;
    this.collections = {};
  }

  createCollection(name) {
    return new Promise((resolve, reject) => {
      if (this.collections[name]) {
        reject("This collection already exists");
      } else {
        if (this.dbPath) {
          // Create persistent database
          this.collections[name] = new Collection({
            filename: `${this.dbPath}.${name}.db`,
            autoload: true
          });
        } else {
          // Create in memory database (mostly used for unit testing purposes)
          this.collections[name] = new Collection();
        }
        resolve();
      }
    });
  }
};
