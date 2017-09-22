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
    liveService.getMatchByGround(req.params.id, 1).then((result) => {
        var model = {"desc": "No match"};
        if (result.length == 1) {
            model = result[0];
            model.runRate = getRunrate(result[0].overs,result[0].balls,result[0].total)
        }
        def.resolve(model);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

function getRunrate(over,ballPerOver,runs){
    over = over+ "";
    var split = over.split(".");
    if (split.length == 1)
        split.push(0);
    var balls = parseInt(split[0]) * ballPerOver + parseInt(split[1]);
    var runRate = ((runs / balls ) * ballPerOver).toFixed(1);
    if (runRate == 'Infinity')
        runRate = 0;
    return runRate;
}


controller.getAllLiveScores = function () {
    const def = Q.defer();
    var model = {};

    liveService.getAllLiveScores(1).then((result) => {
        if (result.length > 0)
            model.groundA = result;
        else
            model.groundA = null;


        liveService.getAllLiveScores(2).then((result) => {
            //model.groundB = result;

            if (result.length > 0)
                model.groundB = result;
            else
                model.groundB = null;

        })
            .catch((error) => {
                def.reject(error);
            });

        liveService.getAllLiveScores(3).then((result) => {
            if (result.length > 0)
                model.groundC = result;
            else
                model.groundC = null;
        })
            .catch((error) => {
                def.reject(error);
            });

        liveService.getAllLiveScores(4).then((result) => {
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
