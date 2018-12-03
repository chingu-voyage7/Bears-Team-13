// IMPORTANT: 
// This module assumes it is called in a DB session.
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

// Mongoose
const mongoUtil = require('./mongoUtil.js');
const schema = require('./schema.js');
const ObjectID = require('mongodb').ObjectID;
const MongoStore = require('connect-mongo')(session);
const User = schema.User;

var setup = false;

let setupPassport = function (app) {
  if (setup) return;
  
  passport.use(new LocalStrategy(
    function (usernameOrEmail, password, done) {
        User.findOne({$or:[{email: usernameOrEmail},{username: usernameOrEmail}]}, (err, user) => {
        console.log("User " + usernameOrEmail + " attempted to log in.");
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.validPassword(password)) { return done(null, false); }
        console.log("User " + usernameOrEmail + " logged in.");
        return done(null, user);
      });
    }
  ));

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
    console.log("WARN: User unathenticated.");
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