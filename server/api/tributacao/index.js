'use strict';

var express = require('express');
var controller = require('./tributacao.controller');

var router = express.Router();

router.get('/', controller.tributacao);

module.exports = router;