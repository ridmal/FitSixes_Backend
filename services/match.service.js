const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getGrounds= function () { // get all Teams

  const def = Q.defer();
  const query = `SELECT * FROM grounds`;
  databaseService.selectQuery(query)
    .then((results) => {

       def.resolve(results);
          })
    .catch((error) => {

      console.log(error);
      def.reject(error);
    });
  return def.promise;
};


service.getTeams= function () { // get all Teams

  const def = Q.defer();
  const query = `SELECT TeamID,TeamName FROM teams`;
   databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      console.log(error);
      def.reject(error);
    }); 
  return def.promise;
};


service.addMatch = function (args) { // add player 
  const def = Q.defer();
  const query = `INSERT INTO matches (name,groundId,overs,balls,team1Id,team2Id,roundId) VALUES ('${args.name}', '${args.groundId}','${args.overs}','${args.balls}', '${args.team1Id}','${args.team2Id}',1)`;
  databaseService.addQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.matchOverallInfoById= function (matchId) { // get all Teams


  var innings_array;
  var obj = new Object();
  var batting_team = new Object();
  var bowling_team = new Object();

  
  var inning ;

  const def = Q.defer();
  var query = 'SELECT T4.matchId,T4.name,T4.groundId,grounds.name as groundName,T4.team1Id,T4.team1Name,T4.team2Id,T4.team2Name,T4.InningId,T4.battingTeamId,T4.battingTeamName FROM grounds INNER JOIN (SELECT T3.matchId,T3.name,T3.groundId,T3.team1Id,T3.team1Name,T3.team2Id,T3.team2Name,T3.InningId,T3.battingTeamId,teams.teamName as battingTeamName FROM teams INNER JOIN (SELECT T2.matchId,T2.name,T2.groundId,T2.team1Id,T2.team1Name,T2.team2Id,teams.teamName as team2Name ,T2.InningId,T2.battingTeamId FROM teams INNER JOIN (SELECT T1.matchId,T1.name,T1.groundId,T1.team1Id,teams.teamName as team1Name,T1.team2Id,T1.InningId,T1.battingTeamId FROM teams INNER JOIN (SELECT matchId,name,groundId,team1Id,team2Id,InningId,battingTeamId FROM matches WHERE matchId='+matchId+' ) AS T1 ON teams.teamId=T1.team1Id) AS T2 ON teams.teamId=T2.team2Id) AS T3 ON teams.teamId=T3.battingTeamId) AS T4 ON grounds.groundId=T4.groundId';
   databaseService.selectQuery(query)
    .then((results) => {
        obj.matchId =results[0].matchId;
        obj.matchName =results[0].name;
        obj.groundId =results[0].groundId;
        obj.groundName =results[0].groundName;
        obj.InningId= results[0].InningId;

        if(results[0].team1Id==results[0].battingTeamId){
              batting_team.id =results[0].team1Id;
              batting_team.name =results[0].team1Name;
              bowling_team.id =results[0].team2Id;
              bowling_team.name =results[0].team2Name;
        }

        else if(results[0].team2Id==results[0].battingTeamId){
              batting_team.id =results[0].team2Id;
              batting_team.name =results[0].team2Name;
              bowling_team.id =results[0].team1Id;
              bowling_team.name =results[0].team1Name;
        }

        obj.curBattingTeam=batting_team;
        obj.curBowlingTeam=bowling_team;
        
        def.resolve(obj);

       })

    .catch((error) => {
      def.reject(error);
    }); 
  return def.promise;
};


service.getBowlingPlayersInfo = function (matchId,teamId) { // add player 
  const def = Q.defer();
 
         query = 'SELECT players.playerId,players.name,T2.runs,T2.wides,T2.noBalls,T2.wickets FROM  players LEFT JOIN (SELECT T1.bowlerId,players.name,T1.runs,T1.wides,T1.noBalls,T1.wickets FROM  players INNER JOIN (SELECT bowlerId,SUM(runs) as runs ,SUM(isWide) as wides,SUM(isNoBall) as noBalls,SUM(isWicket) as wickets FROM bowlingscore WHERE  matchId ='+matchId +' AND bowlingTeamId ='+ teamId +' GROUP by bowlerId) AS T1 ON players.playerId = T1.bowlerId)  AS T2 ON players.playerId = T2.bowlerId WHERE players.teamId ='+ teamId;
        databaseService.selectQuery(query)
          .then((results) => {

         def.resolve(results);
                })
          .catch((error) => {
            def.reject(error);
          });    

  return def.promise;
};

service.getBattingPlayersInfo = function (matchId,teamId) { // add player 
  const def = Q.defer();

         query = 'SELECT players.playerId,players.name,T2.runs,T2.sixes,T2.fours,T2.dots FROM  players LEFT JOIN (SELECT T1.playerId,players.name,T1.runs,T1.sixes,T1.fours,T1.dots FROM  players INNER JOIN (SELECT playerId,SUM(runs) as runs ,SUM(isSix) as sixes,SUM(isFour) as fours,SUM(isDot) as dots FROM battingscore WHERE  matchId ='+matchId +' AND teamId ='+ teamId +' GROUP by playerId) AS T1 ON players.playerId = T1. playerId) AS T2 ON players.playerId = T2. playerId WHERE players.teamId ='+ teamId ;
        databaseService.selectQuery(query)
          .then((results) => {

         def.resolve(results);
                })
          .catch((error) => {
            def.reject(error);
          });    

  return def.promise;
};

service.getBattingInfo = function (matchId,teamId) { // add player 
  const def = Q.defer();

         query = 'SELECT battingTeamId, SUM(runs) as score,MAX(currentBall) as overs FROM bowlingscore WHERE matchId = '+matchId +' AND battingTeamId ='+ teamId+' GROUP BY battingTeamId';
        databaseService.selectQuery(query)
          .then((results) => {

         def.resolve(results);
                })
          .catch((error) => {
            def.reject(error);
          });    

  return def.promise;
};


service.getAllMatches = function () { // add player 
  const def = Q.defer();
  const query = `SELECT matchId,name FROM matches`;
  databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
service.getRecentMatches = function () { // add player 
  const def = Q.defer();
  const query = `SELECT m.matchId,m.name,m.1stScore,m.2ndScore,m.team1Wicket,m.team2Wicket,t.teamName as winTeam , t1.teamName as team1Name,t2.teamName as team2Name FROM matches m,teams t ,teams t1,teams t2 WHERE isLive = 0 and m.wonTeamId=t.teamId and m.team1Id=t1.teamId and m.team2Id = t2.teamId ORDER BY m.matchId DESC`;
  databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.getMatchDetails= function (args) { // get all Teams
  const def = Q.defer();
  const query = `SELECT * FROM matches where matchId = ${args.matchId}`;
  databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.removeMatch = function (matchId) { // add player 
  const def = Q.defer();
  const query = `DELETE FROM matches WHERE matchId=`+ matchId;
  
  databaseService.deleteQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      console.log(error);
      def.reject(error);
    });
  return def.promise;
};




module.exports = service;
