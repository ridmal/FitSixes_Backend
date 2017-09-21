/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};

service.getAllBowlers= function () { // get all Teams
    const def = Q.defer();
    const query = 'SELECT p.name, t.teamName, t.companyName, SUM(b.runs) AS runs, SUM(b.extras) AS extras, SUM(b.isValidBall) AS validBalls, SUM(b.isNoBall) AS noBalls, SUM(b.isWide) AS wideBalls, SUM(b.isWicket) AS wickets FROM bowlingscore b, players p, teams t WHERE b.bowlerId = p.playerId AND p.teamId = t.teamId GROUP BY p.playerId';
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
    const query = `SELECT p.name, t.teamName, t.companyName, SUM(b.runs) AS runs, SUM(b.extras) AS extras, SUM(b.isValidBall) AS validBalls, SUM(b.isNoBall) AS noBalls, SUM(b.isWide) AS wideBalls, SUM(b.isWicket) AS wickets FROM bowlingscore b, players p, teams t WHERE b.bowlerId = ${id} AND b.bowlerId = p.playerId AND p.teamId = t.teamId GROUP BY p.playerId`;
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
    const query = `INSERT INTO bowlingscore (teamId, matchId, bowlerId, runs, extras, currentBall , isValidBall,isNoBall,isWide,isWicket,isRunOut ) VALUES ( '${args.teamId}','${args.matchId}','${args.bowlerId}','${args.runs}','${args.extras}' ,'${args.currentBall}','${args.isValidBall}','${args.isNoBall}','${args.isWide}','${args.isWicket}','${args.isRunOut}')`;
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
    const query = `SELECT t.teamId, t.teamName, t.companyName, m.battingTeamId, SUM(b.runs) AS total, (SUM(b.isWicket) + SUM(b.isRunOut)) AS wickets, m.currentOvers, SUM(b.extras) AS extras FROM bowlingscore b, teams t, matches m WHERE b.matchId = ${id} AND b.teamId = t.teamId AND b.matchId = m.matchId GROUP BY b.matchId`;
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
    const query = `SELECT t.teamId, t.teamName, t.companyName, m.battingTeamId, SUM(b.runs) AS total, (SUM(b.isWicket) + SUM(b.isRunOut)) AS wickets, m.currentOvers, SUM(b.extras) AS extras FROM bowlingscore b, teams t, matches m WHERE m.groundId = ${id} AND m.isLive = ${isLive} AND b.teamId = t.teamId AND b.matchId = m.matchId GROUP BY b.matchId`;
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
