const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoUtil = require('./utils/mongoUtil.js');
const api = require('./api.js');

require('dotenv').config();
const PORT = process.env.PORT || 80;

// Parse body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Initialize App
mongoUtil.connectToServer((err, connection) => {
  if (err) throw err;

  console.log("DB connection success.");

  app.use('/api', api);

  app.listen(PORT, (app) =>
    console.log("App listening on port " + PORT + "...")
  );
});