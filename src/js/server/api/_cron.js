/* These routes will be called by cron-jobs.com daily */
const router = require('express').Router();
const isAuth = require('../utils/passportUtil').isAuth;
const ObjectID = require('mongodb').ObjectID;
const schema = require('../utils/schema.js');
const Event = schema.Event;
const User = schema.User;
const mailer = require('../utils/mailer.js');
const date = new Date();
const generateSS = require('../utils/helpers.js').generateSS;

// Returns true if given event is past due to start.
function afterDate(eventDate) {
  if (!eventDate) {
    return false;
  }

  return eventDate.getTime() < date.getTime();
}

/* Handles CRON job of checking dates
   1) after startDate? --> generateSS(); --> update Event, send email to MEMBERS
   2) after endDate?   --> closed = true --> update Event, send email to 
   3) closed = true?   --> 1 week after? --> delete Event 
*/
function handleDateChecks(user, tries) {
  Event.find({}, {startDate: 1, endDate: 1, members: 1, author: 1, ssList: 1, closed: 1}, (err, events) => {
    if (err && tries < 3) { return handleDateChecks(user, tries++); }
    if (!events) { return; }

    // Check each event start/end dates
    events.map((event) => {

      event.members.push(event.author[0]);

      if (!event.closed) {
        if (afterDate(event.endDate)) {
          Event.updateOne({_id: new ObjectID(event._id)}, {closed: true}, (err) => {
            if (err) { return console.log("ERR!"); }
            
            User.find({_id: {$in : event.members}}, {email: 1, username: 1, firstName: 1}, (err, users) => {
              if (err) { return console.log("Err emailing."); }
              if (!users) { return console.log("404 no users"); }

              users.map((user) => {
                mailer.endDate(user, users[users.indexOf(ssList[user._id])], event);
              });
            });
          });
  
        } else if (afterDate(event.startDate) && !event.ssList) {
          Event.updateOne({_id: new ObjectID(event._id)}, {ssList: generateSS(event)}, (err) => {
            if (err) { return console.log("ERR!"); }

            User.find({_id: {$in : event.members}}, {email: 1, username: 1, firstName: 1}, (err, users) => {
              if (err) { return console.log("Err emailing."); }
              if (!users) { return console.log("404 no users"); }

              users.map((user) => {
                mailer.startDate(user, event);
              });
            });
          });
        }
      } else {
        const weekAfter = event.endDate.setDate(event.endDate.getDate() + 7);
        if (afterDate(weekAfter)) {
          Event.deleteOne({_id: new ObjectID(event._id)});
        }
      }

    });
  });
}

/* Executes a daily task. Allows only Specific user. */
router.post('/daily', (req, res) => {
  console.log("Checking ALL event dates...");
  handleDateChecks(req.user, 0);
  return res.sendStatus(200);
});

module.exports = router;

