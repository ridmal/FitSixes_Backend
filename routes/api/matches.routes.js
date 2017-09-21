var express = require('express');
var router = express.Router();
var matchController = require('../../controllers/match.controller');

router.get('/getInitiateInfo',function(req,res){ // get all teams

  var obj = new Object();
  
  matchController.getGrounds().then(function(result1){
      obj.grounds = result1;
    
      matchController.getTeams().then(function(result2){
        obj.teams = result2;
        res.send(obj);
      }).catch(
              function(error){
                res.send(error);
              }
      );

  }).catch(
    function(error){
      res.send(error);
    }
  );

});

router.post('/addMatch',function(req,res){ // add a tplayer for perticular team.
 matchController.addMatch(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});


router.post('/removeMatch',function(req,res){ // add a tplayer for perticular team.
 matchController.removeMatch(req.body.matchId).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});


router.post('/getMatchDetails',function(req,res){ // add a tplayer for perticular team.
 matchController.getMatchDetails(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});


module.exports = router;