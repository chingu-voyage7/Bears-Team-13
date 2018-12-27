// Production Server file
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passportUtil = require('./src/js/server/utils/passportUtil.js');
const mongoUtil = require('./src/js/server/utils/mongoUtil.js');

const PORT = process.env.PORT || 80;

// Allow JSON and urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Setup/Configure passport
passportUtil.setupPassport(app);

// Allow static files
app.use(express.static(path.join(__dirname, 'build')));


// Connect to DB before opening routes
mongoUtil.connectToServer((err, connection) => {
  if (err) throw err;

  console.log("DB connection success.");

  // Setup API routes
  app.use('/api/', require('./src/server/api/_login.js'));
  app.use('/api/', require('./src/server/api/_user.js'));
  app.use('/api/', require("./src/server/api/_store.js"));
  app.use('/api/', require('./src/server/api/_event.js'));
  app.use('/api/', require('./src/server/api/_invite.js'));
  app.use('/api/', require('./src/server/api/_cron.js'));

  // Setup VIEW routes (Allow react-router-dom to handle view routing)
  app.use('*', (req ,res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


  // Initialize App
  app.listen(PORT, (app) =>
    console.log("App listening on port " + PORT + "...")
  );
});

module.exports = app;


