var express = require('express');
var router = express.Router();
var publicController = require('../../controllers/public.controller');

router.get('/getPastMatches',function(req,res){ // get all teams

  var obj = new Object();
  
  publicController.getPastMatches().then(function(result){
      res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );

});

router.get('/getTeams',function(req,res){ // get all teams

  var obj = new Array();
  var team;
  var player;
  var playes_array;
  
  publicController.getTeams().then(function(result){

  	var teamId_temp=-1;

  	for (var i = 0, len = result.length; i < len; i++) {

	      if((i==0)&& (teamId_temp!=result[i].teamId)){ 
	      		team = new Object();
	            playes_array = new Array();
	  			team.teamId=result[i].teamId;
	  			team.teamName=result[i].teamName;
	  			team.companyName=result[i].companyName;
	  			teamId_temp=result[i].teamId;

	      }


  		if((i>0)&&(teamId_temp!=result[i].teamId)){
  			team.playes =  playes_array;			
  			obj.push(team);
  			team = new Object();
            playes_array = new Array();
  			team.teamId=result[i].teamId;
  			team.teamName=result[i].teamName;
  			team.companyName=result[i].companyName;
  			teamId_temp=result[i].teamId;
  		}

        player = new Object();
        player.playerId=result[i].playerId;
        player.name=result[i].name;
        playes_array.push(player);

        if(i==len-1){
        	team.playes =  playes_array;
        	obj.push(team);
        }
	  
	}
      res.send(obj);
  }).catch(
    function(error){
      res.send(error);
    }
  );

});


module.exports = router;