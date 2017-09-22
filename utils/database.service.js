var mysql = require('mysql');
const Q = require('q');
const service = {};

var con = mysql.createConnection({
  host: "in-cdbr-azure-south-c.cloudapp.net",
  user: "b8c58532399431",
  password: "0cc0b94c",
  database: "fitsixes",
  port:"3306",
  ssl : true
});

  con.connect(function(err) {
  if (err) throw err;
});
<<<<<<< HEAD
=======


// service.createTable = function(name){
//     con.query('CREATE TABLE '+name+' (name VARCHAR(255), address VARCHAR(255))',function(err,result){
//          if (err) throw err;
>>>>>>> b6389b10d50b4cf8fdb0290a63c8ad7ddc469f46

service.selectQuery = function(query){ // select query 
  const def = Q.defer();
      con.query(query,function(err,result){
         if (err) def.reject(err);
         else def.resolve(result);
    });
  return def.promise;
}
service.addQuery = function(query){ // insert query 
    const def = Q.defer();
      con.query(query,function(err,result){
         if (err) def.reject(err);
         else def.resolve("successfully added");
    });
  return def.promise;
}

service.deleteQuery = function(query){ // insert query 
    const def = Q.defer();
      con.query(query,function(err,result){
         if (err) def.reject(err);
         else def.resolve("successfully removed");
    });
  return def.promise;
}

service.bulkInsert = function(query,values){ // insert query 
    const def = Q.defer();
      con.query(query,[values],function(err,result){
         if (err) def.reject(err);
         else def.resolve("successfully added");
    });
  return def.promise;
}

service.updateQuery = function(query){ // update query
    const def = Q.defer();
      con.query(query,function(err,result){
         if (err) def.reject(err);
         else def.resolve("successfully Updated");
    });
  return def.promise;
}

module.exports = service;