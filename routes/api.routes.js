const express = require('express');
const router = express.Router();

const user = require('./api/users.routes');
const team = require('./api/teams.routes');

router.use('/user', user);
router.use('/team',team);

module.exports = router;
