const express = require('express');
const router = express.Router();

const user = require('./api/users.routes');
const team = require('./api/teams.routes');
const player = require('./api/players.routes');
const match = require('./api/matches.routes');
const public = require('./api/public.routes');

router.use('/user', user);
router.use('/team',team);
router.use('/player',player);
router.use('/match',match);
router.use('/public',public);


module.exports = router;
