const express = require('express');
const router = express.Router();

const user = require('./api/users.routes');
const team = require('./api/teams.routes');
const player = require('./api/players.routes');
const battingScore = require('./api/battingScore.routes');

router.use('/user', user);
router.use('/team',team);
router.use('/player',player);
router.use('/battingScore',battingScore);

module.exports = router;
