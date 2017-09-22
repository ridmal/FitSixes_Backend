const Q = require('q');
const playerService = require('../services/player.service');

const controller = {};

controller.getPlayers = function (req) {
  const def = Q.defer();
  let args = {
      teamId : req.teamId
  }
  playerService.getPlayers(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};


controller.addPlayers = function (req) {
  const def = Q.defer();
  

  playerService.addPlayers(req).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
