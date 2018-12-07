const router = require('express').Router();
const Item = require('../utils/schema.js').Item;

router.get("/finditem", (req, res) => {
  if (!req.query.query) { return res.sendStatus(400); }
  console.log(query);
  Item.find({name: {$text: {
    $search: req.query.keywords,
    $caseSensitive: false,
  } }}, (err, docs) => {
    if (err) { return res.sendStatus(500);}
    if (!docs) { return res.sendStatus(400); }
    console.log("Found items...");
    console.log(JSON.stringify(docs));
    res.send(docs);
  }).skip(req.query.page * 10).limit(10);
});

router.post('/purchase', (req, res) => {
  
});

module.exports = router;