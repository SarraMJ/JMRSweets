var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('contact'); // Renders the 'contact' template

});

router.post('/', function(req, res) {
  res.render('contact');
}); 

module.exports = router;