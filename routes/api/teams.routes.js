var express = require('express');
var router = express.Router();
var teamController = require('../../controllers/team.controller');

router.get('/getAllTeams',function(req,res){ // get all teams
  teamController.getAllTeams().then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});
router.post('/addTeam',function(req,res){ // add a team
  teamController.addTeam(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});

module.exports = router;
