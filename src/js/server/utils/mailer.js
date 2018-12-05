const sgMail = require('@sendgrid/mail');
console.log(process.env.REACT_APP_SG_API_KEY);
sgMail.setApiKey(process.env.REACT_APP_SG_API_KEY)