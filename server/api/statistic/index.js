'use strict';

var express = require('express');
var controller = require('./statistic.controller');

var router = express.Router();

router.get('/week', controller.week);
router.get('/month', controller.month);
router.get('/year', controller.year);

module.exports = router;