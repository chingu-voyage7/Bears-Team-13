const config = require('../../../config.js');
const nodemailer = require('nodemailer');


const mailGen = require('mailgen');
var mailGenerator = new mailGen({
  theme: 'default',
  product: {
      // Appears in header & footer of e-mails
      name: 'Secret Santa',
      link: config.HOST_NAME
      // Optional product logo
      // logo: 'https://mailgen.js/img/logo.png'
  }
});

module.exports = {
  inviteUser: function(to, from, eventID, callback) {
    var emailBody = mailGenerator.generate({
      body: {
        name: to,
        intro: from + " invited you to his Secret Santa event!",
        action: {
          instructions: 'To join, please click here:',
          button: {
            text: "Join Event",
            link: config.HOST_NAME + "/api/event/join?id=" + eventID
          }
        },
        outro: "Need help or have questions? Just reply to this email, we'd love to help."  
      }
    });

    callback();
  }
}