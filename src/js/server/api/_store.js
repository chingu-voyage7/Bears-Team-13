const router = require('express').Router();
const mongoUtil = require('../utils/mongoUtil.js');
const Item = mongoUtil.compile("Item");

router.get("/finditem", (req, res) => {
  if (!req.query.query) { return res.sendStatus(400); }
  const parsed = JSON.parse(req.query.query);
  const query = {[parsed[0]] : parsed[1]};
  console.log(query);
  Item.find(query, req.query.projection, (err, docs) => {
    if (err) { return res.sendStatus(500);}
    if (!docs) { return res.sendStatus(400); }
    console.log("Found items...");
    console.log(JSON.stringify(docs));
    res.send(docs);
  }).skip(req.query.page * 10).limit(10);
});

module.exports = router;