var express = require('express');
var router = express.Router();
const dbconnect = require('../utils/database.service');
/* GET home page. */
router.get('/', function(req, res) {
    dbconnect.createTable("rid");
    res.send('respond with a resource');
});

module.exports = router;
