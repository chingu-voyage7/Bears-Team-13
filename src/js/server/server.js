const express = require('express');
const app = express();
const api = require('./api.js');

require('dotenv').config();
const PORT = process.env.PORT || 80;

app.use('/api', api);

if (process.env.PRODUCTION) {
  // Serve view
}

app.listen(PORT, ()=>console.log("App listening on port " + PORT + "..."));