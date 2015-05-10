var express = require('express'),
  router = express.Router(),
  mongo = require('mongodb'),
  db = require('monk')('localhost/personalSiteDb');

/* GET home page. */
router.get('/:projectQuery', function(req, res, next) {
  var projects = db.get('projects');
  var project;
  projects.find({path: req.params.projectQuery})
    .success(function(docs) {
      project = docs[0];
      res.render('project', project);
    })
    .error(function(err) {
      console.log(err);
    })

});

module.exports = router;