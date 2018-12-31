const router = require('express').Router();
const passportUtil = require('../utils/passportUtil.js');
const isAuth = passportUtil.isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const User = schema.User;
const Item = schema.Item;
const Event = schema.Event;
const helpers = require('../utils/helpers.js');
const required = helpers.required;

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

//
// Cart CRUD
//


// Returns [{{event}, {item}}... ]
router.get('/mycart', isAuth, (req, res) => {
  if (!req.user || !req.user._id) {
    return res.sendStatus(500);
  }

  // Generate Cart from {"event_id": "item_id"}
  User.findOne({_id: new ObjectID(req.user._id)}, {cart: 1}, (err, user) => {
    if (err) { return res.sendStatus(500); }
    if (!user) { return res.status(404).send("User not found."); }
    if (!user.cart) { return res.json({}); }

    // Set event & item ids
    const event_ids = Object.keys(user.cart);
    const item_ids = [];
    
    event_ids.forEach((event_id) => {
      if (user.cart[event_id]) {
        item_ids.push(user.cart[event_id]);
      }
    });

    // Get Events
    Event.find({_id: {$in: event_ids}}, {name: 1, ssList: 1, closed: 1}, (err, events) => {
      if (err) { return res.sendStatus(500); }
      if (!events) { return res.status(404).send("Events not found"); }

      // Set recipient_ids
      const recipient_ids = events.map((event, i) => {
        if (!event.closed && event.ssList) {
          event.recipient = { _id: event.ssList[user._id]};
          return event.ssList[user._id];
        }
      });


      // Get recipients. Set event.recipient
      User.find({_id: {$in: recipient_ids}}, {username: 1}, (err, recipients) => {
        if (err) { return res.sendStatus(500); }
        if (!recipients) { return res.status(404).send("Recipients not found"); }

        events.forEach((event, i) => {
          recipients.some((recipient) => {
            if (event.recipient._id.equals(recipient._id)) {
              console.log("Match. Setting recipient to\n" + recipient);
              events[i].recipient = recipient;
              return true;
            }
          });
        });

        // Get Items
        Item.find({_id: { $in: item_ids}}, (err, items) => {
          if (err) { return res.sendStatus(500); }
          if (!items) { return res.status(400).send("Items not found"); }

          console.log(items);

          // Finish generating cart
          const cart = [];
          Object.keys(user.cart).forEach((event_id) => {
            let _event, _item = {};

            // Set { event, recipient }
            for (let i = 0; i < events.length; i++) {
              if (events[i]._id.equals(event_id)) {
                _event = events[i];
                i = events.length;
              }
            }

            // Set { item }
            for (let i = 0; i < items.length; i++) {
              // Note: cart = {event_id: item_id}
              if (items[i]._id.equals(user.cart[event_id])) {
                _item = items[i];
                i = items.length;
              }
            }

            if (_event && _item) {
              cart.push({event: _event, item: _item});
            }
          });

          console.log(cart);

          return res.json(cart);
        });
      });
    });
  });
});

// Adds item to session user's cart given {event_id, item_id}
// Note: Stored as {"event_id": "item_id", ...}
router.post("/mycart/update", isAuth, required(["event_id", "item_id"]), (req, res) => {
  console.log("Adding {event, item (for recipient)} pair to cart...");
  console.log(req.body);

  // Verify "event_id" exists
  Event.findOne({_id: new ObjectID(req.body.event_id)}, {_id: 1}, (err, event) => {
    if (err) { return res.sendStatus(500); }
    if (!event) { return res.status(404).send("Event not found"); }

    // Verify "item_id" exists
    Item.findOne({_id: new ObjectID(req.body.item_id)}, {_id: 1}, (err, item) => {
      if (err) { return res.sendStatus(500); }
      if (!item) { return res.status(404).send("Item not found"); }

      // Set cartDotEvent
      const cartDotEvent = "cart." + req.body.event_id;

      // Set {"event_id": "item_id"}
      User.updateOne({_id: new ObjectID(req.user._id)}, {$set: {[cartDotEvent]: req.body.item_id}}, {upsert: true}, (err, result) => {
        if (err) { return res.sendStatus(500); }
        if (!result) { return res.sendStatus(500); }
        console.log("nModified=" + result.nModified);
        return res.sendStatus(200);
      });
    });
  })
});

// Removes item from session user's cart
router.delete("/mycart/delete", isAuth, required(["event_id"]), (req, res) => {

  const cartDotEvent = "cart." + req.body.event_id;
  console.log("Removing key, value from cart...");
  console.log(cartDotEvent);

  User.updateOne({_id: new ObjectID(req.user._id)}, {$unset: {[cartDotEvent]: 1}}, (err, result) => {
    if (err) { return res.sendStatus(500); }
    if (!result) { return res.sendStatus(500); }
    console.log("nModified= " + result.nModified);
    return res.sendStatus(200);
  });
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
    // In a real application, this is where you would handle
    // processing a credit card/other payment method(s)
    //
    User.updateOne({_id: new ObjectID(req.user._id)}, {
      cart: {}, purchases: user.cart}, (err, result) => {
      if (err) { return res.sendStatus(500); }
      if (!result) { return res.sendStatus(500); }

      console.log("nModified= " + result.nModified);
      return res.sendStatus(200);
    });
  });
});

module.exports = router;