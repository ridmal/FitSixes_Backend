var express = require('express');
var router = express.Router();
var playerController = require('../../controllers/player.controller');

router.post('/getPlayersByTeamId',function(req,res){ // get players for each team.
  playerController.getPlayers(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});
router.post('/addPlayers',function(req,res){ // add a tplayer for perticular team.
 playerController.addPlayers(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});

module.exports = router;
