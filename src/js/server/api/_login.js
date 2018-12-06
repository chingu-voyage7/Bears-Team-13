const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const passport = passportUtil.getPassport();
const isAuth = passportUtil.isAuth;

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