const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const mongoUtil = require('../utils/mongoUtil.js');
const User = mongoUtil.compile("User");

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
})

// Adds user to the DB
router.post('/adduser', function (req, res) {
  User.findOne({username: req.body.username}, (err, existing) => {
    if (err) return res.sendStatus(500);

    if (!existing) {
      var user = new User();
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = user.generateHash(req.body.password);
      user.firstName = req.body.firstName;
      User.create(user, (err, user) => {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(500);
        console.log(JSON.stringify(user));
        console.log("User " + req.body.username + " was added.");
        passport.authenticate('local');
        res.sendStatus(200);
      });
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
  const updates = req.body.updates;
  const fieldsToUpdate = req.body.updates.updates

  console.log(updates);

  validUpdates(updates, (status) => {
    if (status !== 200) {
      return res.sendStatus(status);
    }

    User.updateOne({username: req.user.username}, {$set: fieldsToUpdate}, (err, doc) => {
      if (err) { res.sendStatus(500); }
      if (!doc) { res.sendStatus(400); }
      console.log("User '" + req.user.username + "' was updated.");
      res.sendStatus(200);
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