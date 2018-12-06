const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Event = schema.Event;
var user = new User();

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

router.get('/myuser', isAuth, function (req, res) {
  console.log(req.user);
  var user = req.user;
  user.password = null;
  res.json(user);
});

// Adds user to the DB
router.post('/adduser', function (req, res) {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.send("Error. Email, Username, Password required").status(400);
  }

  User.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, { id: 1}, (err, existing) => {
    if (err) { return res.sendStatus(500); }

    if (!existing) {
      req.body.password = user.generateHash(req.body.password);
      User.create(req.body, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(404); }
        console.log("User " + doc.username + " was added.");
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
  } else if (updates.password) {
    updates.password = user.generateHash(password);
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
      if (!doc) { res.sendStatus(404); }
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

// Returns a list of user's events
router.get('/myevents', isAuth, function(req, res) {
  var page = req.query.page;
  delete req.query.page;
  User.findOne({_id: new ObjectID(req.user._id)}, {events: 1}, (err, userDoc) => {
    const eventIDs = userDoc.events;
    if (err) { return res.sendStatus(500); }
    if (!eventIDs) { return res.sendStatus(404); }
    console.log("User Events found...");
    console.log(JSON.stringify(eventIDs));

    Event.find({_id: { $in: eventIDs}}, req.query, (err, events) => {
      if (err) { return res.sendStatus(500); }
      if (!events) { return res.sendStatus(404); }
      console.log(JSON.stringify(events));
      res.json(events);
    }).skip(page * 10).limit(10);

  });
});

// Returns a list of events the user is invited to
router.get('/myinvites', isAuth, function(req, res) {
  if (!req.user.invites || req.user.invites.length === 0) {
    return res.sendStatus(404);
  }
  console.log("MY INVITES: \n" + JSON.stringify(req.user.invites));
  const page = req.query.page;
  delete req.query.page;

  const invites = req.user.invites.map((id) => {
    return new ObjectID(id);
  });

  Event.find({$in: invites}, req.query, (err, docs) => {
    if (err) { return res.sendStatus(500); }
    if (!docs) { return res.sendStatus(404); }
    return res.json(docs);
  }).skip(page * 10).limit(10);
});

module.exports = router;