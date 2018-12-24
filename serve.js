const config = require('./src/config.js');
let keys = Object.keys(config);
keys.map((key) => {
  if (!process.env[key]) {
    process.env[key] = config[key];
  } else {
    console.log("process.env." + key + " already defined.");
  }
});
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoUtil = require('./src/js/server/utils/mongoUtil.js');
const api = require('./src/js/server/api.js');

const PORT = process.env.PORT || 80;

// Parse body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Use Static files
app.use(express.static(path.join(__dirname, 'build')));


// Initialize App
mongoUtil.connectToServer((err, connection) => {
  if (err) throw err;

  // RESTful API
  app.use('/api', api);

  // Allow ReactJS to handle routing
  app.get('*', function(req, res) {
    console.log("Handling route...");
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log("DB connection success.");
    console.log("App listening on port " + PORT + "...")
  });
});




