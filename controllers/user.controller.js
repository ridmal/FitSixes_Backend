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
controller.addUser = function (args) {
  const def = Q.defer();
//   let users = [{'name':'rid'},{'name':'shaki'}];
//   def.resolve(users);
  let age = args.age;
  let name = args.name;
  let address = args.address;

  userService.addUsers(name,address,age).then((result) => { 
    def.resolve(result);
  })
    .catch((error) => {
      def.reject(error);
    });

  return def.promise;
};

module.exports = controller;
