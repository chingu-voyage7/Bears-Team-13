const ObjectID = require('mongodb').ObjectID;
const schema = require('./schema.js');
const User = schema.User;

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
  // Returns true if given event is past due to start.
  afterStartDate: function(event) {
    if (!event || !event.startDate || !typeof event.startDate.getMonth === 'function') {
      return false;
    }
    const date = new Date();

    if (event.startDate.getTime() <= date.getTime()) {
      return true;
    }
    console.log("Secret Santa doesn't start yet... (" + event.name + ")");
  },
  // Generates a Secret Santa list for a given event
  generateSS: function(event) {
    var members = event.members;
    members.push(event.author[0]);
    var senders = members.slice();
    var used = [];
    var ssList = [];

    for (let i = 0; i < senders.length; i++) {
      let random = getRandom(0, members.length);
      while (random === i || used.indexOf(random) !== -1) {
        random = getRandom(0, members.length);
      }
      ssList.push([senders[i], members[random]]);
      used.push(random);
    }

    return ssList;
    
    console.log("Secret Santa begins for " + event.name + "!");
  }
}