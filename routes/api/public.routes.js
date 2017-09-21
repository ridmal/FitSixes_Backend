var express = require('express');
var router = express.Router();
var publicController = require('../../controllers/public.controller');

router.get('/getLiveMatches',function(req,res){ // get all teams

  var obj = new Object();
  
  publicController.getLiveMatches().then(function(result){
      res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );

});


module.exports = router;