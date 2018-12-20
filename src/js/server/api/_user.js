const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Event = schema.Event;
var userUtil = new User();

// Returns User's PUBLIC info
// (Everything less {email, password})
router.get('/getuser', function (req, res) {
  if (!req.query.username) {
    return res.sendStatus(400);
  }
  User.findOne({username: req.query.username}, {email: 0, password: 0}, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(400); }
    console.log("Found user.");

    delete doc.password;
    console.log(doc);
    res.json(doc);
  });
});

// Returns session user
router.get('/myuser', isAuth, function (req, res) {
  console.log("/myuser fetched.");
  var user = req.user;
  user.password = null;
  res.json(user);
});

// Adds user to the DB
router.post('/adduser', function (req, res) {
  console.log("Adding user...");
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.sendStatus(400).send("Email, Username, Password required");
  }

  User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, {username: 1, password: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    req.body.password = userUtil.generateHash(req.body.password);

    // Create new user
    if (!user) {
      User.create(req.body, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(500); }
        console.log(doc);
        return res.sendStatus(200);
      });

      // Update existing user (ONLY if user has NOT signed up. This occurs when a user is invited (doc created w/ their email))
    } else if (!user.username && !user.password) {
      if (user && user._id)
      User.updateOne({_id: new ObjectID(user._id)}, req.body, {upsert: true}, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(404); }
        console.log("User " + req.body.username + " was added.");
        passport.authenticate('local');
        res.sendStatus(200);
      });

      // User exists
    } else {
      console.log("ERR: username or email already exists.");
      return res.json({error: "username or email already exists."}).status(400);
    }
  });
});

// Returns callback(status) regarding a doc update.
function validUpdates(updates, callback) {
  if (!updates) {
    return callback(400);
  }

  // Whitelist fields users can update. Everything else is restricted.
  const keys = Object.keys(updates);
  const whitelist = ["firstName", "lastName", "email", "username", "password"]
  keys.map((key) => {
    if (whitelist.indexOf(key) === -1) {
      delete updates[key];
    }
  });

  if (updates.password) {
    if (updates.password.length < 6) {
      return callback(400);
    }
    updates.password = userUtil.generateHash(updates.password);
  }

  if (updates.username || updates.email) {
    User.findOne({$or: [{username: updates.username},{email: updates.email}]}, (err, doc) => {
      if (err) { return callback(500); }
      if (!doc) { return callback(200); }
      if (doc) { return callback(400); }
    });
  } else {
    return callback(200);
  }
}

// Edit User {key, value}
router.put('/edituser', isAuth, function (req, res) {
  console.log("Updates:");
  console.log(req.body);

  validUpdates(req.body, (status) => {
    if (status !== 200) {
      return res.sendStatus(status);
    }

    User.updateOne({_id: new ObjectID(req.user._id)}, {$set: req.body}, (err, doc) => {
      if (err) { return res.sendStatus(500); }
      if (!doc) { return res.sendStatus(404); }

      console.log("User '" + req.user.username + "' was updated.");
      return res.sendStatus(200);
    });
  });

});

// Delete User Document
router.delete('/deleteuser', isAuth, function (req, res) {
  req.logout();
  User.deleteOne({username: req.user.username}, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(400); }
    console.log("User " + req.user.username + " was deleted.");
    res.sendStatus(200);
  });
});

module.exports = router;