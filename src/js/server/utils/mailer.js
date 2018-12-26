const config = require('../../../config.js');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(config.SG_KEY);

module.exports = {
  invite: function(email, firstName) {
    console.log("Email sent to " + email);
    console.log("NOTE: We need to send start,end date for event in this email!");
    sgMail.send({
      to: email,
      from: 'inna@' + config.HOST_NAME,
      subject: firstName + " invited you to their Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to their Secret Santa Event.' +
          '<a href="' + config.HOST_URI + '/myevents/invites">Click here to join</a>!' + 
        '</body>'
    });
  },
  drawDate: function(user, event) {
    sgMail.send({
      to: email,
      from: 'inna@' + config.HOST_NAME,
      subject: "Gift Exchange Started for " + event.name + "!",
      html: 
        '<body> The ' + "Gift Exchange Started for " + event.name + "!" +
          '<a href="'+config.HOST_URI+'/event/'+event._id+'> Click here to view your Secret Santa </a>!' + 
        '</body>'
    });

  },
  exchangeDate: function(user, event) {
    sgMail.send({
      to: email,
      from: 'inna@'+config.HOST_NAME,
      subject: "Gift Exchange Ended for " + event.name + "!",
      html: 
        '<body> The Gift Exchange ended for ' + event.name + "." +
        '<a href="'+config.HOST_URI+'/event/'+event._id+'> Click here to see the results</a>!' + 
        '</body>'
    });

  }
}