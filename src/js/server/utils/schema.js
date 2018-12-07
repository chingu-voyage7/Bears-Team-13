const mongoose = require('mongoose');
var mongoUtil = require('./mongoUtil.js');
const connection = mongoUtil.getConnection();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// EVENT
var eventSchema = new Schema({
  name: String,
  author: Array,
  public: Boolean,
  creationDate: Date,
  drawDate: Date, // Gifts are revealed
  endDate: Date,
  members: Array, // [{_id: ObjectID, role: "member"}, {_id: ObjectID, role: "admin"}]
}, { collection: "events"} );

// ITEM
var itemSchema = new Schema({
  name: String,
  usd: Number,
  description: String
}, { collection: "store" });

// USER
var userSchema = new Schema({
  firstName: String,
  email: String,
  username: String,
  password: String,
  events: Array, // [event_id, event_id...]
  purchases: Array, // {item_id, recipient_id}
  invites: Array // [event_id, event_id...]
}, 
{ collection: "users"} );

// TEMP USER
var tempUserSchema = new Schema({
  email: String,
  invites: Array,
  createdAt: {type: Date, expires: 30, default: Date.now }
});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

var schemas = { 
  TempUser: connection.model('TempUser', tempUserSchema),
  User : connection.model('User', userSchema),
  Event : connection.model('Event', eventSchema),
  Item : connection.model('Item', itemSchema)
};

module.exports = schemas;