var mysql = require('mysql');
const Q = require('q');
const service = {};

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "fitsixes"

});

con.connect(function(err) {
  if (err) throw err;
});
// service.createTable = function(name){
//     con.query('CREATE TABLE '+name+' (name VARCHAR(255), address VARCHAR(255))',function(err,result){
//          if (err) throw err;

//         console.log("Table created");
//     });
// };
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