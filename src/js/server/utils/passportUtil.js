// IMPORTANT: 
// This module assumes it is called in a DB session.
const passport = require('./strategies.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoUtil = require('./mongoUtil.js');
const schema = require('./schema.js');
const ObjectID = require('mongodb').ObjectID;
const User = schema.User;

var setup = false;

let setupPassport = function (app) {
  if (setup) return;

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoUtil.getConnection()})
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne(
      {_id: new ObjectID(id)},
      {events: 0, purchases: 0, invites: 0, password: 0},
      (err, doc) => {
        done(null, doc);
      }
    );
  });

  setup = true;
}

let isAuth = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("401 Login failed.");
  }
}

let getPassport = function() {
  return setup? passport: null;
}

module.exports = {
  setupPassport: setupPassport,
  isAuth: isAuth,
  getPassport: getPassport
};