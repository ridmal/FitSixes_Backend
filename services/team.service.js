const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getAllTeams= function () { // get all users
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
service.addTeam = function (tname,cname,rank) { // add users
  const def = Q.defer();
  const query = `INSERT INTO teams (TeamName, CompanyName,Rank) VALUES ('${tname}', '${cname}','${rank}')`;
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
