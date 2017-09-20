var express = require('express');
var router = express.Router();
var userController = require('../../controllers/user.controller');

/* GET users listing. */
// router.get('/add', function(req, res) {
//   res.send('add user');
// });

router.get('/get',function(req,res){
  userController.getAllUsers().then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});
router.post('/add',function(req,res){
  console.log("dea");
  userController.addUser(req.body).then(function(result){
    res.send(result);
  }).catch(
    function(error){
      res.send(error);
    }
  );
});

module.exports = router;
