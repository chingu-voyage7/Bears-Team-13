const router = require('express').Router();
let passportUtil = require('../utils/passportUtil.js');
let passport = passportUtil.getPassport();
let isAuth = passportUtil.isAuth;

router.post('/login', passport.authenticate('local'),
function (req, res) {
  var user = req.user;
  user.password = null;
  res.json(user);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;