var Schema = require('mongoose').Schema;

var schemas = { 
  User : new Schema({
    firstName: String,
    email: String,
    username: String,
    password: String,
    events: Array,
  })
};

module.exports = schemas;