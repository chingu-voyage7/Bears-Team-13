const Router = require('express').Router();

Router.get('/user', (req, res) => {
  res.send("WORKS");
});

module.exports = Router;