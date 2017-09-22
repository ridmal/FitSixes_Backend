const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user 

service.getPlayers= function (args) { // get players for perticular team
  const def = Q.defer();
  const query = `SELECT * FROM players WHERE TeamID = ${args.teamId}`;
  databaseService.selectQuery(query)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

service.addPlayers = function (args) { // add player 

  const def = Q.defer();

  //delete existing players
  const query2 = `DELETE FROM players WHERE teamId=`+ args.teamId; 
  databaseService.deleteQuery(query2)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });


  var values = new Array();
  var player;
  var values_str='';
  
  for (var i = 0, len = args.players.length; i < len; i++) {

        if(i<args.players.length-1){
         values_str = values_str + '("' + args.teamId +'","' + args.players[i] + '"),';
        }

        if(i==args.players.length-1){
         values_str = values_str + '("' + args.teamId +'","' + args.players[i] + '")';
        }
  }

  const query = `INSERT INTO players (teamId, name) VALUES `+values_str;

  //insert new players
  databaseService.bulkInsert(query,values)
    .then((results) => {
       def.resolve(results);
          })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;

};
module.exports = service;
