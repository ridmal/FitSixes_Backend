/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
const Q = require('q');
const bowlerService = require('../services/bowler.service');

const controller = {};

controller.getBowlers = function (req) {
    const def = Q.defer();
    let args = {
        teamId : req.teamId
    }
    bowlerService.getAllBowlers(args).then((result) => {
        def.resolve(result);
})
    .catch((error) => {
        def.reject(error);
});

    return def.promise;
};
controller.getBowlerById = function (req) {
    const def = Q.defer();
    bowlerService.getBowlerById(req.params.id).then((result) => {
        def.resolve(result);
})
    .catch((error) => {
        def.reject(error);
});

    return def.promise;
};


controller.getAllWicketsById = function (req) {
    const def = Q.defer();
    bowlerService.getAllWicketsById(req.params.id).then((result) => {
        def.resolve(result);
})
    .catch((error) => {
        def.reject(error);
});
    return def.promise;
};

module.exports = controller;
