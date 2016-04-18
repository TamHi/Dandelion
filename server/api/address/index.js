'use strict';

var express = require('express');
var controller = require('./address.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/city', controller.city);
router.get('/city/:id/district', controller.district);
router.get('/district/:id/ward', controller.ward);
// router.get('/', controller.index);
router.get('/user/:id', auth.isAuthenticated(), controller.userAddress);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
