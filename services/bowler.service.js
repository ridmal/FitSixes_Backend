/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};

service.getAllBowlers= function () { // get all Teams
    const def = Q.defer();
    const query = 'SELECT b.bowlerId, p.name, p.teamId, t.teamName, t.companyName, SUM(b.runs) AS totalRuns, SUM(b.extras) AS extras, SUM(b.isWide) AS wides, SUM(b.isNoBall) AS noBalls, SUM(b.isWicket) AS wickets, (SUM(b.runs) / SUM(b.isValidBall)) AS eco FROM bowlingscore b, players p, teams t WHERE p.playerId = b.bowlerId AND p.teamId = t.teamId GROUP BY b.bowlerId';
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};

service.getBowlerById = function (id){

    const def = Q.defer();
    const query = `SELECT b.bowlerId, p.name, p.teamId, t.teamName, t.companyName, SUM(b.runs) AS totalRuns, SUM(b.extras) AS extras, SUM(b.isWide) AS wides, SUM(b.isNoBall) AS noBalls, SUM(b.isWicket) AS wickets, (SUM(b.runs) / SUM(b.isValidBall)) AS eco FROM bowlingscore b, players p, teams t WHERE b.bowlerId = ${id} AND p.playerId = b.bowlerId AND p.teamId = t.teamId GROUP BY b.bowlerId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;

};

/*service.getAllWicketsById = function (id){
 const def = Q.defer();
 const query = `SELECT b.teamId, p.name, p.playerId, SUM(wicket) AS wickets FROM bowlingscore b, players p WHERE bowlerId = ${id} AND b.bowlerId = p.playerId`;
 databaseService.selectQuery(query)
 .then((results) => {
 def.resolve(results);
 })
 .catch((error) => {
 def.reject(error);
 });
 return def.promise;
 };*/

service.addNewBall = function (args) { // add player
    const def = Q.defer();
    const query = `INSERT INTO bowlingscore (bowlingTeamId,battingTeamId, matchId, bowlerId, runs, extras, currentBall , isValidBall,isNoBall,isWide,isWicket,isRunOut ) VALUES ( '${args.bowlingTeamId}', '${args.battingTeamId}','${args.matchId}','${args.bowlerId}','${args.runs}','${args.extras}' ,'${args.currentBall}','${args.isValidBall}','${args.isNoBall}','${args.isWide}','${args.isWicket}','${args.isRunOut}')`;
    databaseService.addQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};

service.getSummaryByMatchId = function (id){
    const def = Q.defer();
    const query = `SELECT p.name, SUM(b.runs) AS runs, SUM(b.extras) AS extras, SUM(b.isNoBall) AS noBall, SUM(b.isWide) AS wide, SUM(b.isWicket) AS wickets, MAX(b.currentBall) AS overs, (SUM(b.runs) / SUM(b.isValidBall)) AS eco FROM bowlingscore b, players p WHERE matchId = ${id} AND b.bowlerId = p.playerId GROUP BY p.playerId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

service.getMatchSummaryByMatchId = function (id){
    const def = Q.defer();
    const query = `SELECT t.teamId, t.teamName, t.companyName, SUM(b.runs) AS total, SUM(b.extras) AS extras, (SUM(b.isWicket) + SUM(b.isRunOut)) AS wickets, m.currentOvers AS overs, m.battingTeamId, m.isLive FROM bowlingscore b, teams t, matches m WHERE b.battingTeamId = t.teamId AND m.matchId = b.matchId AND b.matchId = ${id} GROUP BY b.bowlingTeamId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

service.getMatchByGround = function (id,isLive){
    const def = Q.defer();
    const query = `SELECT t.teamId, t.teamName, t.companyName, SUM(b.runs) AS total, SUM(b.extras) AS extras, (SUM(b.isWicket) + SUM(b.isRunOut)) AS wickets, m.currentOvers AS overs, m.battingTeamId FROM bowlingscore b, teams t, matches m WHERE b.battingTeamId = t.teamId AND m.matchId = b.matchId AND m.groundId = ${id} AND m.isLive = ${isLive} GROUP BY b.bowlingTeamId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

service.getScore = function (matchId,playerId){
    const def = Q.defer();
    const query = `SELECT b.runs FROM battingscore b WHERE b.matchId = ${matchId} AND b.playerId = ${playerId}`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

service.getMatchSummary = function (matchId,teamId){
    const def = Q.defer();
    const query = `SELECT t.teamId, t.teamName, t.companyName, SUM(b.runs) AS total, SUM(b.extras) AS extras, ( SUM(b.isWicket) + SUM(b.isRunOut) ) AS wickets, m.currentOvers AS overs, m.battingTeamId, m.isLive FROM bowlingscore b, teams t, matches m WHERE b.matchId = ${matchId} AND t.teamId = ${teamId} AND b.battingTeamId = t.teamId AND m.matchId = b.matchId GROUP BY b.bowlingTeamId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

service.getBowlerByIdAndMatchId = function (bowlerId,matchId){

    const def = Q.defer();
    const query = `SELECT b.bowlerId, p.name, p.teamId, t.teamName, t.companyName, SUM(b.runs) AS totalRuns, SUM(b.extras) AS extras, SUM(b.isWide) AS wides, SUM(b.isNoBall) AS noBalls, SUM(b.isWicket) AS wickets, MAX(b.currentBall) AS lastBall, ( SUM(b.runs) / SUM(b.isValidBall) ) AS eco FROM bowlingscore b, players p, teams t WHERE b.bowlerId = ${bowlerId} AND b.matchId = ${matchId} AND p.playerId = b.bowlerId AND p.teamId = t.teamId GROUP BY b.bowlerId`;
    databaseService.selectQuery(query)
        .then((results) => {
            def.resolve(results);
        })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;

};


module.exports = service;