const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getAllTeams= function () { // get all Teams
  const def = Q.defer();
  const query = `SELECT * FROM teams`;
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
service.addTeam = function (args) { // add team
  const def = Q.defer();
  const query = `INSERT INTO teams (TeamName, CompanyName,Rank) VALUES ('${args.tname}', '${args.cname}','${args.rank}')`;
  databaseService.addQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
service.getTeamDetails = function (args) { // add team
  const def = Q.defer();
  const query = `SELECT * FROM teams where teamId = ${args.teamId}`;
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
module.exports = service;
