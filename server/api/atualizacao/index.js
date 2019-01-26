'use strict';

var express = require('express');
var controller = require('./atualizacao.controller');

var router = express.Router();

router.post('/:id/', controller.salvarAgendamento);
router.get('/:id/:base', controller.buscaUltimasAtt);
router.get('/:id', controller.buscaHistoricoBase);

module.exports = router;
