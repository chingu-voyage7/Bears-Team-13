var Schema = require('mongoose').Schema;

var schemas = { 
  User : new Schema({
    firstName: String,
    email: String,
    username: String,
    password: String,
    events: Array,
  }, { collection: "users"} ),
  Event : new Schema({
    name: String,
    author: String,
    public: Boolean,
    creationDate: Date,
    drawDate: Date,
    endDate: Date,
    members: Array, // [{_id: ObjectID, role: "member"}, {_id: ObjectID, role: "admin"}]
  }, { collection: "events"} ),
  Item: new Schema({
    name: String,
    author: String,
    usd: Number
  }, { collection: "store" })
};

module.exports = schemas;