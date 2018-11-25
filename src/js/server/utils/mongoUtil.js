var mongoose = require('mongoose');
var schema = require('./schema.js');

console.log(process.env.REACT_APP_DB_URI);

module.exports = {
  connectToServer: function ( callback ) {
    mongoose.connect(process.env.REACT_APP_DB_URI, { useNewUrlParser: true}).then(() => {
      _db = mongoose.connection;
      return callback();
    },
    err => { callback(err); });
  },

  getDb: function() {
    return mongoose.connection.db;
  },

  getConnection: function() {
    return mongoose.connection;
  },

  compile: function(schemaName) {
    if (schema[schemaName]) {
      return mongoose.connection.model(schemaName, schema[schemaName]);
    } else {
      console.log("ERROR: " + schemaName + " schema does not exist.");
      return null;
    }
  }
}