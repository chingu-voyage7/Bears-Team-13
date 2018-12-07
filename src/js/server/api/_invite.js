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

  if (!/^.*@[a-z]*.[a-z]*$/gm.test(req.body.email)) {
    console.log("Bad format");
    return res.json({error: "Bad Format"}).status(400);
  }

  User.updateOne({email: req.body.email}, {$addToSet: {invites: req.body.email}}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    // Signup Required (Email not found)
    if (result.nModified === 0) {
      TempUser.update({email: email, $addToSet: {invites: new ObjectID(req.body.eventID)}}, {upsert: true}, (err, doc) => {
        if (err) { return res.sendStatus(500); }
        if (!doc) { return res.sendStatus(400); }
        console.log(doc);
        mailer.signupAndJoin(req.body.email, req.user.username);
        return res.sendStatus(200);
      });
    }
    // Signup NOT Required (Email found)
    mailer.invite(req.body.email, req.user.username);
    res.sendStatus(200);
  });
});

// Accept Email Invite
router.post('/acceptinvite', isAuth, (req, res) => {
  res.sendStatus(500);
});

router.delete('/rejectinvite', isAuth, (req, res) => {
  res.sendStatus(500);
});

module.exports = router;