const Q = require('q');
const publicService = require('../services/public.service');

const controller = {};

controller.getLiveMatches = function () {
  const def = Q.defer();
  publicService.getLiveMatches().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};




module.exports = controller;
