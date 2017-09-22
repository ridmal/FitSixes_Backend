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


  var values = new Array();
  var player;
  var values_str='';
  
  //console.log(args.players.length);

  for (var i = 0, len = args.players.length; i < len; i++) {
   /* console.log(args.teamId);
    console.log(args.players[i]);
    player= new Object();

    player.teamId=args.teamId;
    player.name=args.players[i];
    console.log(player);
    values.push(player); */

        if(i<args.players.length-1){
         values_str = values_str + '("' + args.teamId +'","' + args.players[i] + '"),';
        }

        if(i==args.players.length-1){
         values_str = values_str + '("' + args.teamId +'","' + args.players[i] + '")';
        }


  }

  const def = Q.defer();
  const query = `INSERT INTO players (teamId, name) VALUES `+values_str;

  console.log(values);

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
