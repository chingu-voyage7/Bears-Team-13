const router = require('express').Router();
const fileUpload = require('express-fileupload');
const schema = require('../utils/schema');
const User = schema.User;
const Item = schema.Item;
const Image = schema.Image;

router.use(fileUpload());

router.get('/static/images/:filename', (req ,res) => {
  if (!req.params.filename) {
    return res.sendStatus(400);
  }

  Image.findOne({filename: req.params.filename}, {data: 1}, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(404); }

    return res.send(doc.data);
  });
});

router.post('/static/images/', (req, res) => {
  const file = req.files.file;

  if (!file || !file.name || !file.data || !req.body.contentType) {
    return res.sendStatus(400);
  }

  // Restrict images greater than 500kb
  if (file.data.byteLength > 500000) {
    return res.status(400).send("Images must be less than 500 kilobytes");
  }

  console.log(file.data.byteLength);
  
  Image.updateOne({filename: file.name}, {filename: file.name, data: file.data, contentType: req.body.contentType}, {upsert: true}, (err, doc) => {
    if (err) { return res.sendStatus(500); }
    if (!doc) { return res.sendStatus(404); }

    return res.sendStatus(200);
  })
});

router.put('/static/images/:filename', (req, res) => {

});

router.delete('/static/images/:filename', (req, res) => {

});

module.exports = router;