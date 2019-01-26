'use strict';

var express = require('express');
var controller = require('./ultimasAtt.controller');

var router = express.Router();

router.get('/', controller.tributacao);

module.exports = router;