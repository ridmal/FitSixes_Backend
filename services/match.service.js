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
  const query = `INSERT INTO matches (name,groundId,overs,balls,team1Id,team2Id) VALUES ('${args.name}', '${args.groundId}','${args.overs}','${args.balls}', '${args.team1Id}','${args.team2Id}')`;
  databaseService.addQuery(query)
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
