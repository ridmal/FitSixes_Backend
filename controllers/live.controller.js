const Q = require('q');
const liveService = require('../services/live.service');

const controller = {};

controller.getMatchByGroundId = function (groundId) {


    const def = Q.defer();
    liveService.getMatchByGroundId(groundId).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};

controller.getMatchByGround = function (req) {
    const def = Q.defer();
    liveService.getMatchByGround(req.params.id, req.params.isLive).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

controller.getAllLiveScores = function () {
    const def = Q.defer();
    var model = {};

    liveService.getMatchByGround(1, 1).then((result) => {
        if (result.length > 0)
            model.groundA = result;
        else
            model.groundA = null;


        liveService.getMatchByGround(2, 1).then((result) => {
            //model.groundB = result;

            if (result.length > 0)
                model.groundB = result;
            else
                model.groundB = null;

        })
            .catch((error) => {
                def.reject(error);
            });

        liveService.getMatchByGround(3, 1).then((result) => {
            if (result.length > 0)
                model.groundC = result;
            else
                model.groundC = null;
        })
            .catch((error) => {
                def.reject(error);
            });

        liveService.getMatchByGround(4, 1).then((result) => {
            if (result.length > 0)
                model.groundD = result;
            else
                model.groundD = null;
            def.resolve(model);
        })
            .catch((error) => {
                def.reject(error);
            });


    })
        .catch((error) => {
            def.reject(error);
        });


    return def.promise;
};

module.exports = controller;
