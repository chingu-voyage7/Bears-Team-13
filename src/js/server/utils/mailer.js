const config = require('../../../config.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SG_KEY);

module.exports = {
  signupAndJoin: function(email, firstName) {
    sgMail.send({
      to: email,
      from: 'test@example.com', // Temporary
      subject: firstName + " invited you to his Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to his Secret Santa Event.' +
          '<a href="' + config.HOST_NAME + '/signup?redirect=/dashboard">Click here to join</a> the gift exchange, FREE of charge.' + 
        '</body>'
    });
  },
  invite: function(email, firstName) {
    console.log("TO: " + email);
    sgMail.send({
      to: email,
      from: 'inna@' + config.HOST_NAME,
      subject: firstName + " invited you to his Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to his Secret Santa Event.' +
          '<a href="' + config.HOST_NAME + '/dashboard/invites">Click here to join</a>!' + 
        '</body>'
    });
  }
}