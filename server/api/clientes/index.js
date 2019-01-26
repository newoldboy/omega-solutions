'use strict';

var express = require('express');
var controller = require('./clientes.controller');

var router = express.Router();

router.get('/', controller.trazerCliente);

module.exports = router;
