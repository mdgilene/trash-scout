const NeDB = require("nedb");

module.exports = class Collection {
  constructor(options) {
    this.db = new NeDB(options);
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.db.remove({}, { multi: true }, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  insert(doc) {
    return new Promise((resolve, reject) => {
      this.db.insert(doc, (err, newDoc) => {
        if (err) {
          reject(err);
        } else {
          resolve(newDoc);
        }
      });
    });
  }

  insertAll(docs) {
    return new Promise((resolve, reject) => {
      docs.forEach(doc => {
        this.insert(doc).catch(err => reject(err));
      });
      resolve();
    });
  }

  find(query) {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err, docs) => {
        if (err) return reject(err);
        if (docs.length === 0) return reject("Document not found");
        return resolve(docs[0]);
      });
    });
  }

  findAll(query) {
    return new Promise((resolve, reject) => {
      this.db.find(query, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      });
    });
  }

  update(doc) {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: doc._id }, doc, {}, (err, numReplaced) => {
        if (err) return reject(err);
        return resolve(numReplaced);
      });
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      this.db.count({}, (err, count) => {
        if (err) {
          reject(err);
        } else {
          resolve(count);
        }
      });
    });
  }
};
