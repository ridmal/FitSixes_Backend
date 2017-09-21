/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
const Q = require('q');
const databaseService = require('../utils/database.service');

const service = {};
// table --> user

service.getAllBowlers= function () { // get all Teams
    const def = Q.defer();
    const query = 'SELECT * FROM `bowlingscore`';
    databaseService.selectQuery(query)
        .then((results) => {
        //   if (results.length !== 0) {
        //       deferred.resolve(results);
        //         }
        def.resolve(results);
})
    .catch((error) => {
        def.reject(error);
});

    return def.promise;
};

service.getBowlerById = function (id){

    const def = Q.defer();
    const query = `SELECT * FROM bowlingscore WHERE bowlerId = ${id}`;
    databaseService.selectQuery(query)
        .then((results) => {
        def.resolve(results);
})
    .catch((error) => {
        def.reject(error);
});

    return def.promise;

};

service.getAllWicketsById = function (id){
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
};

service.addNewBall = function (args) { // add player
    const def = Q.defer();
    const query = `INSERT INTO bowlingscore (teamId, matchId, bowlerId, runs, extras, ballStatus,noBall,wide,wicket) VALUES ( '${args.teamId}','${args.matchId}','${args.bowlerId}','${args.runs}','${args.extras}','${args.ballStatus}','${args.noBall}','${args.wide}','${args.wicket}')`;
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
    const query = `SELECT p.name, SUM(b.runs) AS runs, SUM(b.extras) AS extras, SUM(b.noBall) AS noBall, SUM(b.wide) AS wide, SUM(b.wicket) AS wickets FROM bowlingscore b, players p WHERE matchId = ${id} AND b.bowlerId = p.playerId GROUP BY p.name`;
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
