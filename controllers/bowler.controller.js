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
        var model = {};
        for (var i = 0; i < result.length; i++) {
            list.push(result[i].runs)
        }
        model.playerScore = list;
        bowlerService.getMatchSummary(req.body.matchId, req.body.teamId).then((result) => {

            model.matchResult = result;
            bowlerService.getBowlerById(req.body.bowlerId,req.body.matchId).then((result) => {

                model.bowlerResult = result;

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


controller.changeInning = function (req) {
    const def = Q.defer();

    bowlerService.getMatchByMatchId(req.matchId).then((result) => {

        if (result.length == 1){


            if (result[0].inningId == 1 )
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

        }else{
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

        if (matchResult.length == 1){


            //getMatchSummaryByMatchId
            bowlerService.getMatchSummaryByMatchId(req.body.matchId).then((result) => {

                if (result.length == 2){

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


                }else{
                    def.resolve("Match is not finished yet");
                }

                //def.resolve(result);
            })
                .catch((error) => {
                    def.reject(error);
                });
            return def.promise;



        }else{
            def.resolve("Invalid attempt");
        }
    })
        .catch((error) => {
            def.reject(error);
        });
    return def.promise;
};


module.exports = controller;
