/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
const Q = require('q');
const bowlerService = require('../services/bowler.service');
const battingService = require('../services/battingScore.service');

const controller = {};

controller.getBowlers = function (req) {
    const def = Q.defer();
    let args = {
        teamId: req.teamId
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


/*controller.getAllWicketsById = function (req) {
 const def = Q.defer();
 bowlerService.getAllWicketsById(req.params.id).then((result) => {
 def.resolve(result);
 })
 .catch((error) => {
 def.reject(error);
 });
 return def.promise;
 };*/


controller.getSummaryByMatchId = function (req) {
    const def = Q.defer();
    bowlerService.getMatchSummaryByMatchId(req.params.id).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};


controller.addNewBall = function (bowler, batting) {
    const def = Q.defer();
    let args = {
        bowlingTeamId: bowler.bowlingTeamId,
        battingTeamId: bowler.battingTeamId,
        matchId: bowler.matchId,
        bowlerId: bowler.bowlerId,
        runs: bowler.runs,
        extras: bowler.extras,
        currentBall: bowler.currentBall,
        isValidBall: bowler.isValidBall,
        isNoBall: bowler.isNoBall,
        isWide: bowler.isWide,
        isWicket: bowler.isWicket,
        isRunOut: bowler.isRunOut
    };

    bowlerService.addNewBall(args).then(() => {
        let score = {
            teamId: batting.teamId,
            matchId: batting.matchId,
            playerId: batting.playerId,
            runs: batting.runs,
            inningId: batting.inningId,
            isSix: batting.isSix,
            isFour: batting.isFour,
            isDot: batting.isDot
        };

        battingService.addScore(score).then((result) => {


            battingService.updateOvers(bowler.over, bowler.matchId).then((result) => {
                def.resolve(result);
            })
                .catch((error) => {
                    def.reject(error);
                });

            //def.resolve(result);
        })
            .catch((error) => {
                def.reject(error);
            });

        //  def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};

controller.getScore = function (req) {
    const def = Q.defer();
    bowlerService.getScore(req.body.matchId, req.body.playerId).then((result) => {
        var list = [];
        for (var i = 0; i < result.length; i++) {
            list.push(result[i].runs)
        }

        bowlerService.getMatchSummary(req.body.matchId, req.body.teamId).then((matchResult) => {


            bowlerService.getBowlerById(req.body.bowlerId,req.body.matchId).then((bowlerResult) => {


                var model = {
                    playerScore : list,
                    matchResult : matchResult[0],
                    bowlerResult : bowlerResult[0]
                };

                def.resolve(model);
            })
                .catch((error) => {
                    def.reject(error);
                });

            //def.resolve(model);
        })
            .catch((error) => {
                def.reject(error);
            });

        //def.resolve(model);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

controller.getMatchByGround = function (req) {
    const def = Q.defer();
    bowlerService.getMatchByGround(req.params.id, req.params.isLive).then((result) => {
        def.resolve(result);
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};

module.exports = controller;
