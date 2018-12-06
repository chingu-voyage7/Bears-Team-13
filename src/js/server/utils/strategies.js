const passport = require('passport');
const LocalStrategy = require('passport-local');
const mailer = require('./mailer.js');
const schema = require('./schema.js');
const User = schema.User;
const config = require('../../../config.js');

passport.use(new LocalStrategy(
  function (usernameOrEmail, password, done) {
    console.log(usernameOrEmail + ", " + password);
      User.findOne({$or:[{email: usernameOrEmail},{username: usernameOrEmail}]}, (err, user) => {
      console.log("User " + usernameOrEmail + " attempted to log in.");
      console.log("Err: " + JSON.stringify(err));
      console.log("User: " + user);
      if (err) { return done(err); }
      if (!user) {  return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      console.log("User " + usernameOrEmail + " logged in.");
      return done(null, user);
    });
  }
));

module.exports = passport;