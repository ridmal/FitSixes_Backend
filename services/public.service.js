const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getLiveMatches= function (args) { // get players for perticular team
  const def = Q.defer();
  const query = `
                SELECT T4.matchId,T4.name,T4.groundId,grounds.name as groundName,T4.team1Id,T4.team1Name,T4.team2Id,T4.team2Name,T4.roundId,T4.InningId,T4.battingTeamId,T4.battingTeamName,T4.target
                FROM grounds
                INNER JOIN
                (SELECT T3.matchId,T3.name,T3.groundId,T3.team1Id,T3.team1Name,T3.team2Id,T3.team2Name,T3.roundId,T3.InningId,T3.battingTeamId,teams.teamName as battingTeamName,T3.target
                FROM teams
                INNER JOIN
                (SELECT T2.matchId,T2.name,T2.groundId,T2.team1Id,T2.team1Name,T2.team2Id,teams.teamName as team2Name ,T2.roundId,T2.InningId,T2.battingTeamId,T2.target
                FROM teams
                INNER JOIN
                (SELECT T1.matchId,T1.name,T1.groundId,T1.team1Id,teams.teamName as team1Name,T1.team2Id,T1.roundId,T1.InningId,T1.battingTeamId,T1.target
                FROM teams
                INNER JOIN
                (SELECT matchId,name,groundId,team1Id,team2Id,roundId,InningId,battingTeamId,currentOvers,score,target 
                FROM
                matches
                WHERE isLive=0
                ) AS T1
                ON teams.teamId=T1.team1Id) AS T2
                ON teams.teamId=T2.team2Id) AS T3
                ON teams.teamId=T3.battingTeamId) AS T4

                ON grounds.groundId=T4.groundId

                `;
  databaseService.selectQuery(query)
    .then((results) => {
       
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = service;
