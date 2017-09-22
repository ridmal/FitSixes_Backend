const Q = require('q');
const matchService = require('../services/match.service');
const teamService = require('../services/team.service');
const playerService = require('../services/player.service');

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

controller.getAllMatches = function () {
  const def = Q.defer();

  matchService.getAllMatches().then((result) => { 
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
    let team1args = {
      teamId : result[0].team1Id
    }
    let team2args = {
      teamId:result[0].team2Id
    }
    let match = {
      matchId : req.matchId,
      overs : result[0].overs,
      balls : result[0].balls,
      teams : []
    }
    console.log(match.matchId);
    Q.all([teamService.getTeamDetails(team1args),playerService.getPlayers(team1args),teamService.getTeamDetails(team2args),playerService.getPlayers(team2args)]).then(
      (res)=>{
        let team1 = {
           teamId : res[0][0].teamId,
           teamName : res[0][0].teamName,
           players :res[1]
         }
           let team2 = {
           teamId : res[2][0].teamId,
           teamName : res[2][0].teamName,
           players :res[3]
         }
         match.teams.push(team1); 
         match.teams.push(team2);  
        def.resolve(match);
      }
    ).catch(()=>{
        def.reject(error);
    }
    );
 
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
