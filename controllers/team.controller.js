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
controller.addTeam = function (args) {
  const def = Q.defer();
  let tname = args.teamName;
  let cname = args.companyName;
  let rank = 0;

  teamService.addTeam(tname,cname,rank).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
