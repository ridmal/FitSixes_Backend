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
        if (result.length == 1) {
            result[0].runRate = getRunrate(result[0].overs, result[0].balls, result[0].total);
            def.resolve(result);
        } else
            def.resolve({"desc": "No match"});
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

function getRunrate(over, ballPerOver, runs) {
    if (over == 0)
        return 0;
    over = over + "";
    var split = over.split(".");
    if (split.length == 1)
        split.push(0);
    var balls = parseInt(split[0]) * ballPerOver + parseInt(split[1]);
    var runRate = ((runs / balls ) * ballPerOver).toFixed(1);
    return runRate;
}


controller.getAllLiveScores = function () {
    const def = Q.defer();
    var model = {};
    Q.all([liveService.getAllLiveScores(1), liveService.getAllLiveScores(2), liveService.getAllLiveScores(3), liveService.getAllLiveScores(4)]).then(
        (res) => {
            if (res[0].length > 0)
                model.groundA = res[0];

            else
                model.groundA = null;
            if (res[1].length > 0)
                model.groundB = res[1];
            else
                model.groundB = null;
            if (res[2].length > 0)
                model.groundC = res[2];
            else
                model.groundC = null;
            if (res[3].length > 0)
                model.groundD = res[3];
            else
                model.groundD = null;
            def.resolve(model);
        }
    ).catch((error) => {
            def.reject(error);
        }
    );
    // liveService.getAllLiveScores(1).then((result) => {
    //     if (result.length > 0)
    //         model.groundA = result;
    //     else
    //         model.groundA = null;

    //
    // liveService.getAllLiveScores(2).then((result) => {
    //     //model.groundB = result;
    //
    //     if (result.length > 0)
    //         model.groundB = result;
    //     else
    //         model.groundB = null;
    //
    // })
    //     .catch((error) => {
    //         def.reject(error);
    //     });
    //
    // liveService.getAllLiveScores(3).then((result) => {
    //     if (result.length > 0)
    //         model.groundC = result;
    //     else
    //         model.groundC = null;
    // })
    //     .catch((error) => {
    //         def.reject(error);
    //     });

    // liveService.getAllLiveScores(4).then((result) => {
    //     if (result.length > 0)
    //         model.groundD = result;
    //     else
    //         model.groundD = null;
    //     def.resolve(model);
    // })
    //     .catch((error) => {
    //         def.reject(error);
    //     });


    // })
    //     .catch((error) => {
    //         def.reject(error);
    //     });


    return def.promise;
};

module.exports = controller;
