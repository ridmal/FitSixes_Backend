const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getPlayers= function (args) { // get players for perticular team
  const def = Q.defer();
  const query = `SELECT * FROM players WHERE TeamID = ${args.teamId}`;
  databaseService.selectQuery(query)
    .then((results) => {
    //   if (results.length !== 0) {
    //       deferred.resolve(results);
    //         }
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
service.addPlayer = function (args) { // add player 
  const def = Q.defer();
  const query = `INSERT INTO players (TeamID,Name,Age) VALUES ('${args.teamId}', '${args.name}','${args.age}')`;
  databaseService.addQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
module.exports = service;
