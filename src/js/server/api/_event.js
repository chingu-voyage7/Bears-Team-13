const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const mongoUtil = require('../utils/mongoUtil.js');
const Event = mongoUtil.compile("Event");

// Returns a list of events
// Given ["key", "value", "key", "value"...]
router.get("/getevents", (req, res) => {
  const parsed = JSON.parse(req.query.query);
  const temp = {};
  parsed.constructor === Array?parsed.map((v, i) => {
    if (i%2 !== 0) {
      temp[v] = parsed[i + 1];
    }
  }):"";
  query = temp;

  Event.find(query, req.query.projection, (err, docs) => {
    if (err) { return res.sendStatus(500); }
    if (!docs) { return res.sendStatus(404); } // 404 proper code?
    // event.public || event.members.indexOf(req.user._id) !== -1? OK : BAD AUTH
    console.log("Events found...");
    console.log(JSON.stringify(docs));

    res.json(docs);
  }).skip(req.query.page * 10).limit(10);
});

// POSTS an event to our db
router.post('/addevent', isAuth, (req, res) => {
  console.log("BODY: " + JSON.stringify(req.body));
  const event = req.body;
  event.author = {_id: req.user._id, username: req.user.username};
  event.creationDate = Date.now();
  Event.create(event, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(404); }
    console.log("Event added.");
    console.log(JSON.stringify(result));
    res.json(result);
  });
});

// Edits an event
router.put('/editevent', isAuth, (req, res) => {
  Event.findOne({_id: ObjectID(req.body._id)}, (err, findDoc) => {
    if (err) { return res.sendStatus(500); }
    if (!findDoc) { return res.sendStatus(400); }

    // Authorized to edit?
    if (findDoc.members.indexOf({_id: ObjectID(req.user._id), role: "admin"})) {
      Event.updateOne({_id: ObjectID(req.body._id)}, req.body.updates, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(400); }
        console.log("Updated event " + findDoc.name + ".");
        console.log(doc);
        res.send(doc);
      });
    }
  });
});

// Deletes an event
router.delete('/deleteevent', isAuth, (req, res) => {
  Event.findOne({_id: req.body._id}, (err, findDoc) => {
    if (err) { return res.sendStatus(500); }
    if (!findDoc) { return res.sendStatus(400); }

    console.log(JSON.stringify(findDoc.members));
    console.log(req.user.username);

    // Authorized to delete?
    if (findDoc.author._id === req.user._id) {
      Event.updateOne({_id: ObjectID(req.body._id)}, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(400); }
        console.log("Deleted event " + findDoc.name + ".");
        console.log(doc);
        res.send(doc);
      });
    } else {
      res.sendStatus(401);
    }
  });
});

module.exports = router;