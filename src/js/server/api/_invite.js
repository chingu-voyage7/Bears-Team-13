const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const Event = schema.Event;
const User = schema.User;
const TempUser = schema.TempUser;
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

  Event.findOne({_id: new ObjectID(req.body.eventID)}, {members: 1, author: 1}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.sendStatus(404).send("Event not found"); }

    console.log("Sender is Author or Member?");
    console.log(event);

    const member = req.user._id !== event.author[0] || event.members.indexOf(req.user._id) !== -1;

    if (member) {
      console.log("Verified member");

      User.updateOne({email: email}, {$addToSet: {invites: req.body.eventID}}, {upsert: true}, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(500); }
    
        mailer.invite(email, req.user.username);
        return res.sendStatus(200);
      });
  
    } else {
      return res.sendStatus(401);
    }

  
  });
});

// Accept Email Invite
router.post('/acceptinvite', isAuth, (req, res) => {
  /* 
    1) Remove event_id from user.invites []
    2) Add event_id to user.events []
    3) Add user_id to event.members []
  */
  res.sendStatus(500);
});

router.delete('/rejectinvite', isAuth, (req, res) => {
  /*
    1) Remove event_id from invites []
  */
  res.sendStatus(500);
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
    console.log(user);
    Event.find({_id: {$in: invites}}, req.query, (err, docs) => {
      console.log(err);
      if (err) { return res.sendStatus(500); }
      if (!docs) { return res.sendStatus(404).send("Invites not found"); }
      console.log(docs);
      return res.json(docs);
    }).skip(page * 10).limit(10);
  
  });

});


module.exports = router;