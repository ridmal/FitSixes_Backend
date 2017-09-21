const Q = require('q');
const matchService = require('../services/match.service');

const controller = {};

controller.getGrounds = function () {
  const def = Q.defer();
  matchService.getGrounds().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};


controller.getTeams = function () {
  const def = Q.defer();
  matchService.getTeams().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    }); 

  return def.promise;
};

controller.addMatch = function (req) {
  const def = Q.defer();
  let args = {
    name:req.name,
    groundId:req.groundId,
    overs:req.overs,
    balls:req.balls,
    team1Id:req.team1Id,
    team2Id:req.team2Id,
  }

  matchService.addMatch(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

controller.removeMatch = function (macthId) {
  const def = Q.defer();

  matchService.removeMatch(macthId).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};


controller.getMatchDetails = function (req) {
  const def = Q.defer();
  let args = {
    matchId:req.matchId
  }

  matchService.getMatchDetails(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
