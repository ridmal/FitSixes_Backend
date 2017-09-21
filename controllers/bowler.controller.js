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

controller.addNewBall = function (req) {
    const def = Q.defer();
    let args = {
        teamId:req.teamId,
        matchId:req.matchId,
        bowlerId:req.bowlerId,
        runs:req.runs,
        extras:req.extras,
        ballStatus:req.ballStatus,
        noBall:req.noBall,
        wide:req.wide,
        wicket:req.wicket
    };

    bowlerService.addNewBall(args).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};

controller.getSummaryByMatchId = function (req) {
    const def = Q.defer();
    bowlerService.getSummaryByMatchId(req.params.id).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

module.exports = controller;
