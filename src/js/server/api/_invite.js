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

  if (email && /^.*@[a-z]*.[a-z]*$/gm.test(email)) {
    User.updateOne({email: email}, {$addToSet: {invites: req.body.eventID}}, (err, result) => {
      if (err) { return res.sendStatus(500); }

      console.log("User exists? " + result.nModified);

      // Signup Required (Email not found)
      if (result.nModified === 0) {
        TempUser.updateOne({email: email}, {$addToSet: {invites: req.body.eventID}}, {upsert: true}, (err, doc) => {
          if (err) { return res.sendStatus(500); }
          if (!doc) { return res.sendStatus(400); }
          console.log("Doc exists? " + doc.n);
          mailer.signupAndJoin(email, req.user.username);
          return res.sendStatus(200);
        });

      // Signup NOT Required (Email found)
      } else {
      mailer.invite(email, req.user.username);
      return res.sendStatus(200);
      }
    });

  } else {
    console.log("Bad format");
    return res.status(400).send("Bad format");
  }

});

// Accept Email Invite
router.post('/acceptinvite', isAuth, (req, res) => {
  /* 
    1) Remove event_id from invites []
    2) Add event_id to User events
    3) Add user_id to event.memebers
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