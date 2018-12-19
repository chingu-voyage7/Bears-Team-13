const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Item = schema.Item;

// Returns an item given an item_id
router.get("/item", (req, res) => {
  if (!req.query || !req.query.item_id) {
    return res.sendStatus(400);
  }

  Item.findOne({_id: new ObjectID(req.query.item_id)}, (err, item) => {
    if (err) { return res.sendStatus(500); }
    if (!item) { return res.sendStatus(404); }
    return res.json(item);
  })
});

// Returns a list of 10 items.
router.get('/items', (req, res) => {
  Item.find({}, (err, docs) => {
    if (err) { return res.sendStatus(500) }
    if (!docs) { return res.sendStatus(400) }

    res.json(docs)
  }).skip(req.query.page * 10).limit(10)
});

// Text Query for items (Currently, very strict.)
router.get("/finditem", (req, res) => {
  if (!req.query) { return res.sendStatus(400); } 
  Item.find({$text: {
    $search: req.query.keywords,
    $caseSensitive: false,
  } }, (err, docs) => {
    if (err) { return res.sendStatus(500);}
    if (!docs) { return res.sendStatus(400); }
    res.send(docs);
  }).skip(req.query.page * 10).limit(10);
});

// Adds an item to the DB. Only Vendors authorized to do so.
router.post('/additem', isAuth, (req, res) => {
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

// Returns session user's cart.
router.get('/mycart', isAuth, (req, res) => {
  if (!req.user || !req.user._id) {
    return res.sendStatus(500);
  }

  // Get list of item ids
  User.findOne({_id: new ObjectID(req.user._id)}, {cart: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.status(404).send("User not found."); }

    console.log(user);

    // Get item docs in cart
    Item.find({_id: {$in: user.cart}}, (err, items) => {
      if (err) { return res.sendStatus(500); }
      if (!items) { return res.status(400).send("Items not found"); }
      
      return res.json(items);
    });
  });
});

// Adds item to session user's cart given {item_id, recipient}
router.post("/mycart/add", isAuth, (req, res) => {
  if (!req.body || !req.body.item_id || !req.body.recipient_id) {
    return res.sendStatus(400);
  }
  
  // Item exists?
  Item.findOne({_id: new ObjectID(req.body.item_id)}, {_id: 1}, (err, item) => {
    if (err) { return res.sendStatus(500); }
    if (!item) { return res.sendStatus(404); }
    
    // Add item to cart
    User.updateOne({_id: new ObjectID(req.user._id)}, {$addToSet: {cart: [[req.body.item_id, req.body.recipient_id]]}}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      if (!result) { return res.sendStatus(500); }

      console.log("nModified= " + result.nModified);
      return res.sendStatus(200);
    });
  });
});

// Removes item from session user's cart
router.delete("/mycart/delete", isAuth, (req, res) => {
  if (!req.body || !req.body.item_id || !req.user._id) {
    return res.sendStatus(400);
  }

  User.updateOne({_id: new ObjectID(req.user._id)}, {$pull: {cart: req.body.item_id}}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(500); }
    console.log("nmodified= " + result.nModified);
    return res.sendStatus(200);
  })
});

// Get ALL purchased items.
router.get("/mypurchases", isAuth, (req, res) => {
  User.findOne({_id: new ObjectID(req.user._id)}, {purchases: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.sendStatus(404); }

    console.log(user);
    return res.json(user.purchases);
  });
});

// Purchase ALL items in your cart.
router.post('/mycart/purchase', isAuth, (req, res) => {

  // Get cart
  User.findOne({_id: new ObjectID(req.user._id)}, {cart: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.sendStatus(404); }

    // Purchase ALL items in cart
    // cart [[item_id, recipient]...] ---> purchases [[item_id, recipient]...]
    // In a real application, this is where you would handle
    // processing a credit card/other payment method(s)
    //
    User.updateOne({_id: new ObjectID(req.user._id)}, {
      cart: [], purchases: cart}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      if (!result) { return res.sendStatus(500); }
      
      console.log("nModified= " + result.nModified);
      return res.sendStatus(200);
    });
  });
});

module.exports = router;