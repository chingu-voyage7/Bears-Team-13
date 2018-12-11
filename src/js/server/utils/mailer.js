const config = require('../../../config.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SG_KEY);

module.exports = {
  invite: function(email, firstName) {
    console.log("Email sent to " + email);
    sgMail.send({
      to: email,
      from: 'inna@secretsanta.io',
      subject: firstName + " invited you to his Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to his Secret Santa Event.' +
          '<a href="' + config.HOST_NAME + '/dashboard/invites">Click here to join</a>!' + 
        '</body>'
    });
  }
}