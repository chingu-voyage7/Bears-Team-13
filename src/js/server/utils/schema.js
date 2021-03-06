const mongoose = require('mongoose');
var mongoUtil = require('./mongoUtil.js');
const connection = mongoUtil.getConnection();
const imageConnection = mongoUtil.getImageConnection();
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// EVENT
var eventSchema = new Schema({
  name: String,
  author: Object,
  public: false,
  startDate: {type:Date, required: true}, // Secret Santa assignment date! 401 cannot join after this date.
  endDate: {type:Date, required: true},   // Gift Exchange date!
  members: Array,  // [{_id: ObjectID, role: "member"}, {_id: ObjectID, role: "admin"}]
  ssList: Object,
  closed: Boolean,
  recipient: Object // Temporary
}, { collection: "events"} );

// ITEM
var itemSchema = new Schema({
  name: String,
  usd: Number,
  description: String
}, { 
  collection: "store"
});

// Allow text queries
itemSchema.index({
  name: 'text'
});

// USER
var userSchema = new Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: {type: String, required: true},
  username: String,
  password: String,
  events: Array, // [event_id, event_id...]
  invites: Array, // [event_id, event_id...]
  cart: Object, // {item_id: recipient_id...}
  purchases: Object, // {item_id: recipient_id...}
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

var imageSchema = new Schema({
  filename: String,
  contentType: String,
  data: Buffer
}, { collection: "images" });

var schemas = {
  User : connection.model('User', userSchema),
  Event : connection.model('Event', eventSchema),
  Item : connection.model('Item', itemSchema),
  Image: imageConnection.model('Image', imageSchema)
};

module.exports = schemas;