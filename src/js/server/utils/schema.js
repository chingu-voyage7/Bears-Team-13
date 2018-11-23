var Schema = require('mongoose').Schema;

var schemas = { 
  User : new Schema({
    username: String,
    password: String,
    events: Array,
  })
};

module.exports = schemas;