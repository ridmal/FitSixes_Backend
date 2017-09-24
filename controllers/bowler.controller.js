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


    Q.all([bowlerService.getMatchByMatchId(bowler.matchId), bowlerService.getBowlerByIdWithMatchId(bowler.matchId, bowler.bowlerId)]).then((result) => {

        if (result[0].length == 1) {

            if(result[1][0].lastBall == null)
                result[1][0].lastBall = 0;

            var matchOver = getCurrentOver(result[0][0].currentOvers, result[0][0].balls, 1);
            var currentBall = getCurrentOver(parseFloat(result[1][0].lastBall.toFixed(2)), result[0][0].balls, 1);

            let bowling = {
             bowlingTeamId: bowler.bowlingTeamId,
             battingTeamId: bowler.battingTeamId,
             matchId: bowler.matchId,
             bowlerId: bowler.bowlerId,
             runs: bowler.runs,
             extras: bowler.extras,
             currentBall: currentBall,
             isValidBall: bowler.isValidBall,
             isNoBall: bowler.isNoBall,
             isWide: bowler.isWide,
             isWicket: bowler.isWicket,
             isRunOut: bowler.isRunOut
             };

             let battingModel = {
             teamId: batting.teamId,
             matchId: batting.matchId,
             playerId: batting.playerId,
             runs: batting.runs,
             inningId: batting.inningId,
             isSix: batting.isSix,
             isFour: batting.isFour,
             isDot: batting.isDot
             };

            Q.all([bowlerService.addNewBall(bowling),battingService.addScore(battingModel),battingService.updateOvers(matchOver, bowler.matchId)]).then((result) => {

                var model = {
                    matchOver: matchOver,
                    ballerOver: currentBall
                }
                def.resolve(model);
            }).catch((err) => {
                def.resolve(err);
            });
        } else {
            def.resolve({desc: "Bad request"});
        }
    }).catch((err) => {
        def.resolve(err);
    });
    return def.promise;
};

controller.getScore = function (req) {

    const def = Q.defer();

    Q.all([bowlerService.getScore(req.body.matchId, req.body.playerId), bowlerService.getMatchSummary(req.body.matchId, req.body.teamId), bowlerService.getBowlerByIdWithMatchId(req.body.matchId, req.body.bowlerId)]).then(
        (result) => {

            var list = [];
            var model = {};
            for (var i = 0; i < result[0].length; i++) {
                list.push(result[0][i].runs)
            }
            model.playerScore = list;
            model.matchResult = result[1][0];
            model.bowlerResult = result[2][0];
            model.bowlerResult.lastBall = parseFloat(result[2][0].lastBall.toFixed(2));
            def.resolve(model);
        }
    ).catch((error) => {
            def.reject(error);
        }
    );

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


controller.changeInning = function (req) {
    const def = Q.defer();

    bowlerService.getMatchByMatchId(req.matchId).then((result) => {

        if (result.length == 1) {


            if (result[0].inningId == 1)
                result[0].inningId = 0;
            else
                result[0].inningId = 1;

            let args = {
                matchId: req.matchId,
                isLive: 1,
                battingTeamId: req.battingTeamId,
                currentOvers: 0,
            };

            bowlerService.changeInning(args).then((result) => {

                def.resolve(result);
            })
                .catch((error) => {
                    def.reject(error);
                });

        } else {
            def.resolve("Invalid attempt");
        }


    })
        .catch((error) => {
            def.reject(error);
        });

    return def.promise;
};


controller.endMatch = function (req) {
    const def = Q.defer();

    bowlerService.getMatchByMatchId(req.body.matchId).then((matchResult) => {

        if (matchResult.length == 1) {


            //getMatchSummaryByMatchId
            bowlerService.getMatchSummaryByMatchId(req.body.matchId).then((result) => {

                if (result.length == 2) {

                    let args = {
                        matchId: req.body.matchId,
                        currentOvers: matchResult[0].overs,
                        firstScore: result[0].total,
                        teamOneWicket: result[0].wickets,
                        secondScore: result[1].total,
                        teamTwoWickets: result[1].wickets,
                        wonTeamId: req.body.wonTeamId
                    };

                    bowlerService.updateMatch(args).then((result) => {
                        def.resolve(result);
                    })
                        .catch((error) => {
                            def.reject(error);
                        });


                } else {
                    def.resolve("Match is not finished yet");
                }

                //def.resolve(result);
            })
                .catch((error) => {
                    def.reject(error);
                });
            return def.promise;


        } else {
            def.resolve("Invalid attempt");
        }
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};


controller.startMatch = function (req) {
    const def = Q.defer();

    bowlerService.setOffMatches(req.body.groundId).then(() => {

        bowlerService.setOnLine(req.body.groundId, req.body.matchId).then((result) => {
            def.resolve(result);
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

controller.undoLastBall = function (req) {
    const def = Q.defer();

    Q.all([bowlerService.undoLastBall(req.params.matchId), bowlerService.undoBattingTable(req.params.matchId), bowlerService.getMatchByMatchId(req.params.matchId)]).then(
        (res) => {


            if (res[2].length == 1) {
                var model = {
                    bowlingTable: res[0],
                    battingTable: res[1]
                }
                if (res[2][0].currentOvers > 0) {
                    var match = res[2][0];

                    model.currentOver = getCurrentOver(match.currentOvers, match.balls, -1);
                    bowlerService.undoMatchTable(model.currentOver, req.params.matchId).then(() => {
                        def.resolve(model);
                    })
                        .catch((error) => {
                            def.reject(error);
                        });
                } else {
                    model.currentOver = 0;
                    def.resolve(model);
                }

            } else {
                def.resolve({desc: "Invalid attempt"});
            }
        }
    ).catch((error) => {
            def.reject(error);
        }
    );
    return def.promise;
};

function getCurrentOver(currentOvers, ballPerOver, noOfBalls) {
    currentOvers = currentOvers + "";
    var split = currentOvers.split(".");
    if (split.length == 1)
        split.push(0);
    var balls = (parseInt(split[0]) * ballPerOver + parseInt(split[1])) + noOfBalls;
    return parseFloat(parseInt((balls / ballPerOver)) + "." + (balls % ballPerOver));
}

module.exports = controller;
