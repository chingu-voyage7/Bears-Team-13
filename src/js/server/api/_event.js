const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const Event = schema.Event;
const User = schema.User;

// Returns an event given event_id
router.get('/event', (req, res) => {
  Event.findOne({_id: new ObjectID(req.query.event_id)}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(404); }

    if (!event.public) {
      if (req.user) {

        if (ObjectID.toString(event.author[0]) === ObjectID.toString(req.user._id)) {
          return res.json(event);
        }
        if (event.members.indexOf(req.user._id) !== -1) {
          return res.json(event);
        }
      }
      return res.sendStatus(401);
    }

    return res.json(event);
  })
})

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
    
    res.json(docs);
  }).skip(req.query.page * 10).limit(10);
});

function getMembers(res, ids, projection) {
  User.find({_id: {$in: ids}}, projection, (err, docs) => {
    if (err) { return res.sendStatus(500); }
    if (!docs) { return res.sendStatus(404); }
    return res.json(docs);
  });
}

// Returns a list of members from an event
router.get("/eventmembers", (req, res) => {
  if (!req.query || !req.query.event_id) {
    return res.sendStatus(400);
  }

  let projection = req.query;

  Event.findOne({_id: new ObjectID(projection.event_id)}, {public: 1, author: 1, members: 1}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(404); }

    const members = event.members;
    members.push(event.author[0]);
    delete projection.page;
    delete projection.event_id;

    if (!event.public) {
      if (event.author[0] === req.user._id || event.members.indexOf({_id: new ObjectID(req.user._id), role: "admin"})) { 
        return getMembers(res, members, projection);
      } 
      return res.sendStatus(401);
    } else {
      return getMembers(res, members, projection);
    }
  });
});

// POSTS an event to our db
router.post('/addevent', isAuth, (req, res) => {
  var event = req.body;
  event.author = [req.user._id, req.user.username];
  event.creationDate = Date.now();
  Event.create(event, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(404); }
      console.log("Event " + event.name + " added.");
    User.updateOne({_id: new ObjectID(req.user._id)}, {$push: {events: result._id}}, (err, raw) => {
      if (err) { return res.sendStatus(500); }
      if (!raw) { return res.sendStatus(404); }
      console.log("Event added to " + req.user.username + "'s list.");
      res.json(result);
    });

  });
});

function validEdits(edits) {
  if (!edits || edits.creationDate || edits.author || edits.members) {
    return false;
  }
  if (edits.startDate) {
    console.log("ALERT: Do NOT allow startDate IF old StartDate > new StartDate")
  }
  return true;
}

// Edits an event
router.put('/editevent', isAuth, (req, res) => {
  console.log("Editing event...");
  console.log(req.body);
  const event_id = req.body.event_id;
  if (!event_id || !validEdits(req.body)) {
    console.log("BAD");
    return res.sendStatus(400);
  }

  Event.findOne({_id: new ObjectID(event_id)}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(404); }

    // Authorized to edit?
    if (event.members.indexOf({_id: ObjectID(req.user._id), role: "admin"}) || event.author[0] === req.user._id) {
      var updates = req.body;
      delete updates.event_id;

      Event.updateOne({_id: new ObjectID(event_id)}, updates, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(400); }
        console.log("Updated event " + event.name + ".");
        res.sendStatus(200);
      });
    }
  });
});

// Deletes an event
router.delete('/deleteevent', isAuth, (req, res) => {
  Event.findOne({_id: req.body._id}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(400); }

    console.log(JSON.stringify(event.members));
    console.log(req.user.username);

    // Authorized to delete?
    if (event.author._id === req.user._id) {
      Event.updateOne({_id: ObjectID(req.body._id)}, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(400); }
        console.log("Deleted event " + event.name + ".");
        console.log(doc);
        res.send(doc);
      });
    } else {
      res.sendStatus(401);
    }
  });
});



module.exports = router;