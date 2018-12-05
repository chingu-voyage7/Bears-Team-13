const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const mongoUtil = require('./utils/mongoUtil.js');
const passportUtil = require('./utils/passportUtil.js');

passportUtil.setupPassport(router);

router.use('/', require('./api/_login.js'));

router.use('/', require('./api/_user.js'));

router.use('/', require("./api/_store.js"));

router.use('/', require('./api/_event.js'));


module.exports = router;