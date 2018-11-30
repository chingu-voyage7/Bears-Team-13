var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  firstName: String,
  email: String,
  username: String,
  password: String,
  events: Array, // [event_id, event_id...]
  purchases: Array // {item_id, recipient_id}
}, 
{ collection: "users"} );

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}


var schemas = { 
  User : userSchema,
  Event : new Schema({
    name: String,
    author: Object,
    public: Boolean,
    creationDate: Date,
    drawDate: Date, // Gifts are revealed
    endDate: Date,
    members: Array, // [{_id: ObjectID, role: "member"}, {_id: ObjectID, role: "admin"}]
  }, { collection: "events"} ),
  Item: new Schema({
    name: String,
    usd: Number,
    description: String
  }, { collection: "store" })
};

module.exports = schemas;