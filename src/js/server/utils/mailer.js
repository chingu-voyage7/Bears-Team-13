const config = require('../../../config.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SG_KEY);

module.exports = {
  invite: function(email, firstName) {
    console.log("Email sent to " + email);
    console.log("NOTE: We need to send start,end date for event in this email!");
    sgMail.send({
      to: email,
      from: 'inna@secretsanta.io',
      subject: firstName + " invited you to their Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to their Secret Santa Event.' +
          '<a href="' + config.HOST_NAME + '/myevents/invites">Click here to join</a>!' + 
        '</body>'
    });
  },
  drawDate: function(email, firstName) {

  },
  exchangeDate: function(email, firstName) {
    
  }
}