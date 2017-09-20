const express = require('express');
const router = express.Router();

const user = require('./api/users.routes');
const team = require('./api/teams.routes');
const player = require('./api/players.routes');

router.use('/user', user);
router.use('/team',team);
router.use('/player',player);

module.exports = router;
