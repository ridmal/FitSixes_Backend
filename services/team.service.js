const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getAllTeams= function () { // get all Teams
  const def = Q.defer();
  const query = `SELECT * FROM teams`;
  databaseService.selectQuery(query)
    .then((results) => {
         
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.addTeam = function (args) { // add team
  const def = Q.defer();
  const query = `INSERT INTO teams (TeamName, CompanyName) VALUES ('${args.tname}', '${args.cname}')`;

  
  databaseService.addQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.removeTeam = function (teamId) { // add team
  const def = Q.defer();
  const query1 = `DELETE FROM teams WHERE teamId=`+ teamId;

  
  databaseService.deleteQuery(query1)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });


  const query2 = `DELETE FROM players WHERE teamId=`+ teamId;

  
  databaseService.deleteQuery(query2)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });
  

  return def.promise;
};
module.exports = service;
