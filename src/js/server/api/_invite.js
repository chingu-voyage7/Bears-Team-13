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
  res.sendStatus(500);
});

router.delete('/rejectinvite', isAuth, (req, res) => {
  res.sendStatus(500);
});

module.exports = router;