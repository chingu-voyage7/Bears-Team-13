const config = require('../../../config.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SG_KEY);

module.exports = {
  invite: function(to, firstName) {
    sgMail.send({
      to,
      from: "test@example.com",
      subject: firstName + " invited you to his Secret Santa event.",
      html: "<p>Click here to join </p>"
    })
  }
}