const mongoose = require('mongoose');
var mongoUtil = require('./mongoUtil.js');
const connection = mongoUtil.getConnection();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// EVENT
var eventSchema = new Schema({
  name: String,
  author: Array,
  public: false,
  creationDate: Date,
  startDate: Date, // Date Exchange Starts. No one can join after this date.
  members: Array, // [{_id: ObjectID, role: "member"}, {_id: ObjectID, role: "admin"}]
  ssList: Array
}, { collection: "events"} );

// ITEM
var itemSchema = new Schema({
  name: String,
  usd: Number,
  description: String
}, { 
  collection: "store"
});

itemSchema.index({
  name: 'text'
});

// USER
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  password: String,
  events: Array, // [event_id, event_id...]
  invites: Array, // [event_id, event_id...]
  cart: Array, // [item_id, item_id]
  purchases: Array, // [[item_id, recipient_id]]
  verified: false,
  vendor: false
}, { 
  collection: "users" 
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var schemas = {
  User : connection.model('User', userSchema),
  Event : connection.model('Event', eventSchema),
  Item : connection.model('Item', itemSchema)
};

module.exports = schemas;