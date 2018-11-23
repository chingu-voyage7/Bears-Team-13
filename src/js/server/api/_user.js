const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const mongoUtil = require('../utils/mongoUtil.js');
const User = mongoUtil.compile("User");
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;

router.post('/adduser', function (req, res) {

  User.findOne({username: req.body.username}, (err, existing) => {
    if (err) return res.sendStatus(500);

    console.log(existing);

    if (!existing) {
      User.create(req.body, (err, user) => {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(500);
  
        console.log("User " + req.body.username + " was added.");
        passport.authenticate('local');
        res.sendStatus(200);
      });
    } else {
      return res.sendStatus(400);
    }
  });

  console.log("BODY: " + JSON.stringify(req.body));
});

module.exports = router;