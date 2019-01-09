const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const helpers = require('../utils/helpers.js');
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Event = schema.Event;
const Image = schema.Image;
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

// Returns a list of your secret santa { users }
router.get("/myrecipients", isAuth, function (req, res) {

  console.log("fetching recipients...");
  
  User.findOne({_id: new ObjectID(req.user._id)}, {events: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.sendStatus(404); }

    Event.find({_id: {$in: user.events}}, {ssList: 1, closed: 1, name: 1}, (err, events) => {
      if (err) { return res.sendStatus(500); }
      if (!events) { return res.sendStatus(404); }
      
      const recipient_ids = [];
      
      events.forEach((event) => {
        if (!event.closed && event.ssList) {
          recipient_ids.push(event.ssList[user._id]);
        }
      });

      User.find({_id: {$in: recipient_ids}}, {username: 1}, (err, recipients) => {
        if (err) { return res.sendStatus(500); }
        if (!recipients) { return res.sendStatus(404); }

        const json = [];
        events.forEach((event) => {
          let index = 0;

          if (!event.closed && event.ssList) {
            recipients.some((recipient, i) => {
              console.log(event + "\n");
              console.log(recipient);
              if (recipient._id.equals(event.ssList[user._id])) {
                index = i;
                return;
              }
            });
          
            json.push({name: event.name, _id: event._id, recipient: recipients[index]});
          }
        });

        console.log(json);
        return res.json(json);
      });
    })
  });
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

        passport.authenticate('local');
        return res.sendStatus(200);
      });

      // Update existing user (ONLY if user has NOT signed up. This occurs when a user is invited (doc created w/ their email))
    } else if (!user.username && !user.password) {
      if (user && user._id)
      User.updateOne({_id: new ObjectID(user._id)}, req.body, {upsert: true}, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(404); }

        passport.authenticate('local');
        res.sendStatus(200);
      });

      // User exists
    } else {
      return res.status(400).json({error: "username or email already exists."});
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
  User.deleteOne({_id: new ObjectID(req.user._id)}, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(400); }

    Image.deleteOne({filename: "user." + req.user._id}, (err, result) => {
      if (err) { return res.sendStatus(500); }

      console.log("User " + req.user.username + " was deleted.");
      req.logout();
      return res.sendStatus(200);  
    });
  });
});

module.exports = router;