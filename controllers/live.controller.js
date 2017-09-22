const Q = require('q');
const liveService = require('../services/live.service');

const controller = {};

controller.getMatchByGroundId = function (groundId) {

  
  const def = Q.defer();
  liveService.getMatchByGroundId(groundId).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};

controller.getMatchByGround = function (req) {
    const def = Q.defer();
    liveService.getMatchByGround(req.params.id, req.params.isLive).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

module.exports = controller;
