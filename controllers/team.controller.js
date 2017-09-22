const Q = require('q');
const teamService = require('../services/team.service');

const controller = {};

controller.getAllTeams = function () {
  const def = Q.defer();
  teamService.getAllTeams().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
controller.addTeam = function (req) {
  const def = Q.defer();
  let args = {
   tname :req.teamName,
   cname :req.companyName
  }

  teamService.addTeam(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

controller.removeTeam = function (teamId) {
  const def = Q.defer();

  teamService.removeTeam(teamId).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
