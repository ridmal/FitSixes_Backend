const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};

service.addScore = function (args) { // add score
  const def = Q.defer();
  const query = `INSERT INTO battingscore (teamId,matchId,playerId,runs,inningId,six,four,dot) VALUES (${args.teamId},${args.matchId},${args.playerId},${args.runs},${args.inningId},${args.six},${args.four},${args.dot})`;
  databaseService.addQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
service.getPlayerAllScore = function (args) { // add player 
  const def = Q.defer();
  const query = `SELECT b.matchId,m.name,b.runs from battingscore b ,matches m where b.playerId=${args.playerId} and b.matchId=m.matchId`;
  databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
service.matchBattingSummery = function (args) { // add player 
  const def = Q.defer();
  console.log('cdc');
  const query = `SELECT p.name,t.teamName,b.playerid,SUM(b.runs) as runs from battingscore b,teams t,players p where b.playerId = p.playerId and b.teamId = t.teamId and b.matchId=${args.matchId} GROUP BY b.matchId,b.playerId`;
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
