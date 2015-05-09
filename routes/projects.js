var express = require('express'),
  router = express.Router(),
  mongo = require('mongodb'),
  // db = require('monk')('localhost/personalSiteDb');

/* GET home page. */
router.get('/:projectQuery', function(req, res, next) {
  // res.render('project', {projectName: req.params.projectQuery});
  // var projects = db.get('projects');
  // var project;
  // projects.find({path: req.params.projectQuery})
  //   .success(function(docs) {
  //     project = docs[0];
  //     res.render('project', project);
  //   })
  //   .error(function(err) {
  //     res.render('project', {});
  //   })
  //   .complete(function(){
  //     res.render('project', {});
  //   });
  res.render('project', {name: "test"});
});

module.exports = router;