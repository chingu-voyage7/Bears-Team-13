#! /app/bin/node
const ObjectID = require('mongodb').ObjectID;
const schema = require('./utils/schema.js');
const Event = schema.Event;
const User = schema.User;
const mailer = require('./utils/mailer.js');
const date = new Date();


// Returns a random integer between min (inclusive) and max (exclusive)
function getRandom(min, max) {
  if (min === max) {
    return min;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns true if given event is past due to start.
function afterDate(eventDate) {
  if (!eventDate) {
    return false;
  }

  return eventDate.getTime() < date.getTime();
}

// Generates a Secret Santa list for a given event
function generateSS(event) {
  if (!event.members || event.members.length === 0) {
    return null;
  }

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
}

/* Handles daily start, end checks. Performs these tasks:
   1) after startDate? --> generateSS(); --> update Event, send email to MEMBERS
   2) after endDate?   --> closed = true --> update Event, send email to 
   3) closed = true?   --> 1 week after? --> delete Event 
*/
function handleDailyChecks(tries) {
  Event.find({}, {startDate: 1, endDate: 1, members: 1, author: 1, ssList: 1}, (err, events) => {
    if (err && tries < 3) { return handleDailyChecks(tries++); }
    if (!event) { return; }

    // Check each event start/end dates
    events.map((event) => {

      if (afterDate(event.endDate) && !event.closed) {
        Event.updateOne({_id: new ObjectID(event._id)}, {closed: true});

      } else if (afterDate(event.startDate) && !event.ssList) {
        Event.updateOne({_id: new ObjectID(event._id)}, {ssList: generateSS(event)});
      }

    });
  });
}

handleDailyChecks(0);
