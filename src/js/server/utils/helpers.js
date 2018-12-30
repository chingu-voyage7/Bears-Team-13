const ObjectID = require('mongodb').ObjectID;
const schema = require('./schema.js');
const User = schema.User;
const Event = schema.Event;

// Returns a random integer between min (inclusive) and max (exclusive)
function getRandom(min, max) {
  if (min === max) {
    return min;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  // Middleware that allows NONE OR MORE whitelisted req.body keys.
  whitelist: function (whitelist) {
    if (!whitelist) {
      whitelist = [];
    }

    return function(req, res, next) {
      if (!req.body) {
        return next();
      }

      const edits = Object.keys(req.body);
    
      if (!edits || edits.length > whitelist.length) {
        return res.sendStatus(400);
      }
    
      for (let i = 0; i < edits.length; i++) {
        if (whitelist.indexOf(edits[i]) === -1) {
          return res.sendStatus(400);
        }
      }
    
      return next();
    }
  },
  // Middleware that requires ALL req.body keys.
  required: function (required) {
    if (!required) {
      return next();
    }

    return function(req, res, next) {
      if (!req.body) {
        return res.status(400).send(JSON.stringify(required) + " fields required.");
      }

      const keys = Object.keys(req.body);
    
      if (!keys) {
        return res.sendStatus(400);
      }
    
      for (let i = 0; i < required.length; i++) {
        if (!req.body[required[i]]) {
          return res.status(400).send(JSON.stringify(required) + " fields required.");
        }
      }
    
      return next();
    }

  },
  // Generates a Secret Santa list for a given event
  // {sender_id: reciever_id, ...}
  generateSS: function(event) {
    var members = event.members;
    members.push(event.author._id);

    // Not enough people!
    if (!members || members.length < 2) {
      return null;
    }

    var senders = members.slice();
    var used = [];
    var ssList = {};

    for (let i = 0; i < senders.length; i++) {
      let random = getRandom(0, members.length);
      while (random === i || used.indexOf(random) !== -1) {
        random = getRandom(0, members.length);
      }
      ssList[senders[i]] = members[random];
      used.push(random);
    }

    return ssList;
  }
}