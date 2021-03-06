const Q = require('q');
const battingScoreService = require('../services/battingScore.service');

const controller = {};

controller.addScore = function (req) {
  const def = Q.defer();
  let args = {
    teamId:req.teamId,
    matchId:req.matchId,
    playerId:req.playerId,
    runs:req.runs,
    inningId:req.inningId,
    isSix: req.isSix,
    isFour: req.isFour,
    isDot: req.isDot
  }

  battingScoreService.addScore(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
controller.getPlayerAllScore = function (req) {
  const def = Q.defer();
   let args = {
       playerId : req.playerId
   };
    battingScoreService.getPlayerAllScore(args).then((result) => { 
        def.resolve(result);
    })
        .catch((error) => {
        def.reject(error);
        });
  return def.promise;
};
controller.matchBattingSummery = function (req) {
  const def = Q.defer();
   let args = {
       matchId : req.matchId
   };
    battingScoreService.matchBattingSummery(args).then((result) => { 
        def.resolve(result);
    })
        .catch((error) => {
        def.reject(error);
        });
  return def.promise;
};


module.exports = controller;
