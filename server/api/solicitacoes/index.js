'use strict';

var express = require('express');
var controller = require('./solicitacoes.controller');

var router = express.Router();

router.get('/', controller.buscaEmExecucao);

module.exports = router;