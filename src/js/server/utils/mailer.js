const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_KEY);

module.exports = {
  invite: function(email, firstName) {
    console.log("Email sent to " + email);
    console.log("NOTE: We need to send start,end date for event in this email!");
    sgMail.send({
      to: email,
      from: 'inna@' + process.env.HOST_NAME,
      subject: firstName + " invited you to their Secret Santa event.",
      html: 
        '<body>' + firstName + ' invited you to their Secret Santa Event.' +
          '<a href="' + process.env.HOST_URI + '/myevents/invites">Click here to join</a>!' + 
        '</body>'
    });
  },
  startDate: function(user, event) {
    sgMail.send({
      to: user.email,
      from: 'inna@' + process.env.HOST_NAME,
      subject: "Gift Exchange Started for " + event.name + "!",
      html: 
        '<body> The ' + "Gift Exchange Started for " + event.name + "!" +
          '<a href="'+process.env.HOST_URI+'/event/'+event._id+'> Click here to view your Secret Santa </a>!' + 
        '</body>'
    });

  },
  endDate: function(user, yourSS, event) {
    sgMail.send({
      to: user.email,
      from: 'inna@'+process.env.HOST_NAME,
      subject: "Gift Exchange Ended for " + event.name + "!",
      html: 
        '<body> The Gift Exchange ended for ' + event.name + "." +
        '<p>User ' + yourSS.username + ' was your Secret Santa! Your gift is shipping now. :)</p>' +
        '<a href="'+process.env.HOST_URI+'/event/'+event._id+'> Click here to view the results</a>!' + 
        '</body>'
    });

  }
}