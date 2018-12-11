const router = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Item = schema.Item;


router.get("/finditem", (req, res) => {
  if (!req.query) { return res.sendStatus(400); }
  // console.log(query);
  Item.find({$text: {
    $search: req.query.keywords,
    $caseSensitive: false,
  } }, (err, docs) => {
    if (err) { return res.sendStatus(500);}
    if (!docs) { return res.sendStatus(400); }
    console.log("Found items...");
    console.log(JSON.stringify(docs));
    res.send(docs);
  }).skip(req.query.page * 10).limit(10);
});

router.post('/additem', (req, res) => {
  if (!req.body) { return res.sendStatus(400); }

  User.findOne({_id : new ObjectID(req.user._id)}, {vendor: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.sendStatus(404).send("User not found."); }
    if (!user.vendor) { return res.sendStatus(401).send("Not Authorized (vendor)."); }

    Item.create(req.body, (err, doc) => {
      if (err) { return res.sendStatus(500); }
      if (!doc) { return res.sendStatus(400); }
      console.log("Item created! :)");
      console.log(JSON.stringify(doc));
      return res.sendStatus(200);
    })
  });

});

router.post('/purchase', (req, res) => {
  res.sendStatsu(500);
});

module.exports = router;