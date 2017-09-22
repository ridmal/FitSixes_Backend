var express = require('express');
var router = express.Router();
var liveController = require('../../controllers/live.controller');


/*router.get('/getMatchByGroundId/:groundId',function(req,res){ // get all teams

 //console.log(req.params.groundId);
  liveController.getMatchByGroundId(req.params.groundId).then(function(result){
      res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );

});*/

router.get('/getMatchByGround/:id/:isLive',function(req,res){

    liveController.getMatchByGround(req).then(function(result){
        res.send(result);
    }).catch(
        function(error){
            res.send(error);
        }
    );
});

router.get('/getAllLiveScores',function(req,res){

    liveController.getAllLiveScores().then(function(result){
        res.send(result);
    }).catch(
        function(error){
            res.send(error);
        }
    );
});


module.exports = router;