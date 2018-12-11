const router = require('express').Router();
const Item = require('../utils/schema.js').Item;

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

router.post('/purchase', (req, res) => {
  res.sendStatsu(500);
});

module.exports = router;