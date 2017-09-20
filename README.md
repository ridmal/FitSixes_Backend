# FitSixes_Backend

This tool is for university of moratuwa- Faculty of information technology anual cricket match.

This is the # BackEnd of the Project. NodeJs with Mysql database

Basic Structure ,
* routes --> holds the api routes and directs the api calls to the controllers. 
* controllers --> for adding validations , get input data (input params) and send to the service.
* services --> services holds the database access functions (database access queries are written inside the services) 
* util--> holds the common services ( ex - database connection service which is help to connect database with project.)

How to add a new Api for accessing a new Table
* create a route file inside the routes/api/ folder (__.routes.js).Then import that router file to api.routes.js
* Then create the controller for handles that routes in controllers/ folder (__.controller.js)
* Next create the service for accessing the database (add the relevent queries) in services/ folder (__.service.js) 

* Create a mysql database --> 'fitsixes'.
* And run query mentioned in following document.
(Basic Tables structure in mySql database is in dbTables.txt file.)

* Please send your pull request to the dev branch