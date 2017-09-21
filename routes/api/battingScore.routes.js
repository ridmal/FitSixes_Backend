var express = require('express');
var router = express.Router();
var battingScoreController = require('../../controllers/battingScore.controller');

router.post('/addScore',function(req,res){ // add a score in battingScore table.
 battingScoreController.addScore(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});
router.post('/getPlayerAllScore',function(req,res){ // add a score in battingScore table.
 battingScoreController.getPlayerAllScore(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});
router.post('/matchBattingSummery',function(req,res){ // add a score in battingScore table.
 battingScoreController.matchBattingSummery(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});


module.exports = router;
