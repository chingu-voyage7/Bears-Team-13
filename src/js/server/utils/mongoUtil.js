var mongoose = require('mongoose');

module.exports = {
  connectToServer: function ( callback ) {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true}).then(() => {
      return callback();
    },
    err => { callback(err); });
  },

  getDb: function() {
    return mongoose.connection.db;
  },

  getConnection: function getConnection() {
    return mongoose.connection;
  }

}
