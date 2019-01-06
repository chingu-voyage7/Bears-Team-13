const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const Event = schema.Event;
const User = schema.User;
const whitelist = require('../utils/helpers.js').whitelist;
const mailer = require('../utils/mailer.js');

// Sends Email Invite
router.post('/invite', isAuth, (req, res) => {
  console.log("Inviting user...");
  console.log(JSON.stringify(req.body));
  const email = req.body.email;

  if (!(email && /^.*@[a-z]*.[a-z]*$/gm.test(email))) {
    console.log("Bad format");
    return res.status(400).send("Bad format");
  }

  Event.findOne({_id: new ObjectID(req.body.event_id)}, {members: 1, author: 1}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(404).send("Event not found"); }

    const member = req.user._id !== event.author[0] || event.members.indexOf(req.user._id) !== -1;

    if (member) {
      User.updateOne({email: email}, {$addToSet: {invites: req.body.event_id}}, {upsert: true}, (err, user) => {
        if (err) { return res.sendStatus(500); }
        if (!user) { return res.sendStatus(500); }

        mailer.invite(email, req.user.username);
        return res.sendStatus(200);  
      });
    } else {
      return res.sendStatus(401);
    }

  });
});

// Accept Email Invite
router.post('/acceptinvite', isAuth, whitelist(["event_id"]), (req, res) => {

  console.log(req.user.username + " accepting invite...");
  console.log("event_id = " + req.body.event_id);

  // Verify Invite
  User.findOne({_id: new ObjectID(req.user._id)}, {invites: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.status(404).send("User not found"); }
    if (!user.invites || user.invites.indexOf(req.body.event_id) === -1) { return res.status(404).send("Invite not found."); }

    // Verify Start Date < Current Date
    Event.findOne({_id: req.body.event_id}, {startDate: 1}, (err, event) => {
      if (err) { return res.sendStatus(500); }
      if (!event) { return res.status(404).send("Event not found."); } 

      const date = new Date();
      if (event.startDate.getTime() <= date.getTime()) {
        User.updateOne({_id: new ObjectID(req.user._id)}, {$pull: {invites: req.body.event_id}});
        return res.status(401).send("Cannot join past start date.");
      }

      // Update User & Event docs
      User.updateOne({_id: new ObjectID(req.user._id), invites: req.body.event_id}, {
        $pull: {invites: req.body.event_id},
        $addToSet: {events: req.body.event_id}
      }, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(404).send("User not found."); }
        
        console.log("User's events & invites updated.");
  
        Event.updateOne({_id: req.body.event_id}, { 
          $addToSet: {members: req.user._id}
        }, (err, event) => {
          if (err) { return res.sendStatus(500); }
          if (!event) { return res.status(404).send("Event not found"); }
          console.log("Event members updated.");
          console.log("SUCCESS! User joined the event.");
          return res.sendStatus(200);
        });
      });
    });
  });


});

router.delete('/rejectinvite', isAuth, (req, res) => {
  console.log("Rejecting invite...");
  console.log(JSON.stringify(req.body));
  User.updateOne({_id: new ObjectID(req.user._id)}, {$pull: {invites: req.body.event_id}}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(404); }
    console.log("Invite rejected.");
    res.sendStatus(200);
  })
});

// Returns a list of events the user is invited to
router.get('/myinvites', isAuth, function(req, res) {
  const page = req.query.page;
  delete req.query.page;

  User.findOne({_id: new ObjectID(req.user._id)}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.sendStatus(404).send("User not found."); }
    
    const invites = user.invites.map((id) => {
      return new ObjectID(id);
    });
    Event.find({_id: {$in: invites}}, req.query, (err, docs) => {
      if (err) { return res.sendStatus(500); }
      if (!docs) { return res.sendStatus(404).send("Invites not found"); }
      return res.json(docs);
    }).skip(page * 10).limit(10);
  
  });

});


module.exports = router;