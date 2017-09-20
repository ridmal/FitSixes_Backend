const Q = require('q');
const userService = require('../services/user.service');

const controller = {};

controller.getAllUsers = function () {
  const def = Q.defer();
//   let users = [{'name':'rid'},{'name':'shaki'}];
//   def.resolve(users);
  userService.getAllUsers().then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};
controller.addUser = function (req) {
  const def = Q.defer();
//   let users = [{'name':'rid'},{'name':'shaki'}];
//   def.resolve(users);
let args ={
  age:req.age,
  name:req.name,
  address:req.address
}
  userService.addUsers(args).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
