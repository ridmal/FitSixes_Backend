const Q = require('q');
const publicService = require('../services/public.service');

const controller = {};

controller.getPastMatches = function () {
  const def = Q.defer();
  publicService.getPastMatches().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};

controller.getTeams = function () {
  const def = Q.defer();
  publicService.getTeams().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};




module.exports = controller;
