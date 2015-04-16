var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:projectName', function(req, res, next) {
  res.render('project', {projectName: req.params.projectName})
});

module.exports = router;
