var mongoose = require('mongoose');

let connection, imageConnection;

module.exports = {
  connectToServers: function ( callback ) {
    connection = mongoose.createConnection(process.env.DB_URI, { useNewUrlParser: true}, function(err) {
      if (err) { return callback(err); }

      imageConnection = mongoose.createConnection(process.env.IMAGE_DB_URI, { useNewUrlParser: true}, function(err) {
        if (err) { return callback(err); }
        return callback();
      })
    });
  },

  getConnection: function() {
    return connection;
  },

  getImageConnection: function() {
    return imageConnection;
  },

}
