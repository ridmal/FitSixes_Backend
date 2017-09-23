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

router.post('/createMatch',function(req,res){ // add a tplayer for perticular team.
 matchController.addMatch(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});


router.get('/getAllMatches',function(req,res){ // add a tplayer for perticular team.
 matchController.getAllMatches().then(function(result){
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
router.get('/getAllRecentMatches',function(req,res){ // add a tplayer for perticular team.
 matchController.getRecentMatchDetails().then(function(result){
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


router.get('/matchOverallInfoById/:id',function(req,res){ // 
 matchController.matchOverallInfoById(req.params.id).then(function(result){


  result.Innings = new Array();

  var innings_array = new Array();
  var inning = new Object();

  inning.battingTeam= new Object();
  inning.bowlingTeam= new Object();


  var first_ining_bowling_team = new Object();
  first_ining_bowling_team.players = new Array();

  var first_ining_batting_team = new Object();
  first_ining_batting_team.players = new Array();

  var second_ining_bowling_team = new Object();
  second_ining_bowling_team.players = new Array();

  var second_ining_batting_team = new Object();
  second_ining_batting_team.players = new Array();
  
  //console.log(result);
  if(result.InningId==1){

              
              matchController.getBowlingPlayersInfo(result.matchId,result.curBowlingTeam.id).then(function(result2){
                //console.log(JSON.parse(JSON.stringify(result2)));
                first_ining_bowling_team.teamName = result.curBowlingTeam.name;
                first_ining_bowling_team.teamId = result.curBowlingTeam.id;
                first_ining_bowling_team.players = JSON.parse(JSON.stringify(result2));

                inning.bowlingTeam =first_ining_bowling_team;
                inning.id=1;

                                        matchController.getBattingPlayersInfo(result.matchId,result.curBattingTeam.id).then(function(result3){
                                          
                                          first_ining_batting_team.teamName = result.curBattingTeam.name;
                                          first_ining_batting_team.teamId = result.curBattingTeam.id;
                                          first_ining_batting_team.players = result3;

                                          inning.battingTeam =first_ining_batting_team;

                                                      matchController.getBattingInfo(result.matchId,result.curBattingTeam.id).then(function(result4){
                        
                                                                  inning.score= result4[0].score;
                                                                  inning.overs= result4[0].overs;


                                                                  innings_array.push(inning);
                                                                  result.Innings = innings_array;
                                                                  res.send(result);
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

                  }).catch(
                       function(error){
                       res.send(error);
                  }
                              );
  }

  if(result.InningId==2){


              matchController.getBowlingPlayersInfo(result.matchId,result.curBattingTeam.id).then(function(result2){
                first_ining_bowling_team.teamName = result.curBattingTeam.name;
                first_ining_bowling_team.teamId = result.curBattingTeam.id;
                first_ining_bowling_team.players = JSON.parse(JSON.stringify(result2));
                inning.bowlingTeam =first_ining_bowling_team;

                                        matchController.getBattingPlayersInfo(result.matchId,result.curBowlingTeam.id).then(function(result3){
                                       
                                          first_ining_batting_team.teamName = result.curBowlingTeam.name;
                                          first_ining_batting_team.teamId = result.curBowlingTeam.id;
                                          first_ining_batting_team.players = result3;
                                          inning.battingTeam =first_ining_batting_team;
                                          inning.id=1;



                                          innings_array.push(inning);

                                          inning = new Object();

                                          inning.battingTeam= new Object();
                                          inning.bowlingTeam= new Object();


                                                                          matchController.getBowlingPlayersInfo(result.matchId,result.curBowlingTeam.id).then(function(result5){
                                                                              second_ining_bowling_team.teamName = result.curBowlingTeam.name;
                                                                              second_ining_bowling_team.teamId = result.curBowlingTeam.id;
                                                                              second_ining_bowling_team.players = JSON.parse(JSON.stringify(result5));
                                                                              inning.bowlingTeam =second_ining_bowling_team;

                                                                                                      matchController.getBattingPlayersInfo(result.matchId,result.curBattingTeam.id).then(function(result6){
                                                                                                       
                                                                                                        second_ining_bowling_team_ining_batting_team.teamName = result.curBattingTeam.name;
                                                                                                        second_ining_bowling_team_ining_batting_team.teamId = result.curBattingTeam.id;
                                                                                                        second_ining_bowling_team_ining_batting_team.players = result6;
                                                                                                        inning.battingTeam =second_ining_batting_team;
                                                                                                        inning.id=2;


                                                                                                                        matchController.getBattingInfo(result.matchId,result.curBattingTeam.id).then(function(result7){
                                        
                                                                                                                                  inning.score= result7[0].score;
                                                                                                                                  inning.overs= result7[0].overs;


                                                                                                                                  innings_array.push(inning);
                                                                                                                                  result.Innings = innings_array;
                                                                                                                                  res.send(result);
                                                                                                                        }).catch(
                                                                                                                          function(error){
                                                                                                                            res.send(error);
                                                                                                                          }
                                                                                                                        );

                                                                                            

                                                                                                      }).catch(
                                                                                                        function(error){
                                                                                                          res.send(error);
                                                                                                        });

                                                                            }).catch(
                                                                                     function(error){
                                                                                     res.send(error);
                                                                            });

                                         
                              

                                        }).catch(
                                          function(error){
                                            res.send(error);
                                          });

              }).catch(
                       function(error){
                       res.send(error);
              });
  }


  }).catch(
    function(error){
      res.send(error);
    }
  );
});




module.exports = router;