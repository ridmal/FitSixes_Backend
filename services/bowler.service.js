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
    const query = `SELECT b.teamId, p.name, p.playerId, COUNT(*) as wickets FROM bowlingscore b, players p WHERE bowlerId = ${id} AND ballStatus = 6 AND b.bowlerId = p.playerId`;
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
