/**
 * Created by Nimesha Buddhika on 9/20/2017.
 */
var express = require('express');
var router = express.Router();
var bowler = require('../../controllers/bowler.controller');


router.get('/getAllBowlers',function(req,res){
    bowler.getBowlers(req.body).then(function(result){
        res.send(result);
    }).catch(
        function(error){
            res.send(error);
        }
    );
});

router.get('/getBowlerById/:id',function(req,res){
    bowler.getBowlerById(req).then(function(result){
        res.send(result);
    }).catch(
        function(error){
            res.send(error);
        }
    );
});

router.get('/getHighestWicketsById/:id',function(req,res){
    bowler.getAllWicketsById(req).then(function(result){
        res.send(result);
    }).catch(
        function(error){
            res.send(error);
        }
    );
});



module.exports = router;
