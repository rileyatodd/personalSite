var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/resume', function(req, res, next) {
  res.render('resume');
});

router.get('/contact', function(req, res, next) {
  res.render('contact');
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

router.get('/chicago-food-safety', function(req, res, next) {
  res.render('chicago-food-safety');
})

module.exports = router;