const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const mongoUtil = require('../utils/mongoUtil.js');
const User = mongoUtil.compile("User");
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;

router.post('/adduser', function (req, res) {

  console.log("BODY: " + JSON.stringify(req.body));

  User.findOne({username: req.body.username}, (err, existing) => {
    if (err) return res.sendStatus(500);

    console.log("existing? " + existing?true:false);

    if (!existing) {
      User.create(req.body, (err, user) => {
        if (err) return res.sendStatus(500);
        if (!user) return res.sendStatus(500);
  
        console.log("User " + req.body.username + " was added.");
        passport.authenticate('local');
        res.sendStatus(200);
      });
    } else {
      return res.json({error: "username or email exists."}).status(400);
    }
  });

  
});

module.exports = router;