const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getAllUsers = function () { // get all users
  const def = Q.defer();
  const query = `SELECT * FROM players`;
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
service.addUsers = function (name,address,age) { // add users
  const def = Q.defer();
  const query = `INSERT INTO users (name, address,age) VALUES ('${name}', '${address}','${age}')`;
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
