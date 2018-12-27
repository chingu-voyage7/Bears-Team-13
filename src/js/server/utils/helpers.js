const ObjectID = require('mongodb').ObjectID;
const schema = require('./schema.js');
const User = schema.User;
const Event = schema.Event;


module.exports = {
  getRecipients: function(user, callback) {
    // Get user events
    User.findOne({_id: new ObjectID(user._id)}, {events: 1}, (err, user) => {
      if (err) { return callback(500, null); }
      if (!user) { return callback(404, null); }

      console.log("EVENTS: " + user.events.length);

      // Get ssList for each event
      Event.find({_id: {$in: user.events}}, {ssList: 1, closed: 1}, (err, events) => {
        if (err) { return callback(500, null); }
        if (!events) { return callback(404, null); }

        // Find my [user_id, recipient_id] pair(s) in the list
        const recipients_ids = events.map((event) => {
          if (event.closed || !event.ssList || event.ssList.length === 0) {
            return null;
          }

          for (let i = 0; i < event.ssList.length; i++) {
            if (ObjectID.toString(event.ssList[i][0]) === ObjectID.toString(user._id)) {
              if (event.ssList[i][1]) {
                return event.ssList[i][1];
              }
            }
          }
        });

        User.find({_id: {$in: recipients_ids}}, {username: 1}, (err, recipients) => {
          if (err) { return callback(500, null); }
          if (!recipients) { return callback(404, null); }
    
          return callback(null, recipients);
        });
      });
    });
  }
}