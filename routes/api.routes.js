const express = require('express');
const router = express.Router();

const user = require('./api/users.routes');
const team = require('./api/teams.routes');
const player = require('./api/players.routes');
const battingScore = require('./api/battingScore.routes');
const bowling = require('./api/bollowing.routes');
const match = require('./api/matches.routes');
const public = require('./api/public.routes');
const live = require('./api/live.routes');

router.use('/user', user);
router.use('/team',team);
router.use('/player',player);
router.use('/battingScore',battingScore);
router.use('/bowler',bowling);
router.use('/match',match);
router.use('/public',public);
router.use('/live',live);

module.exports = router;
