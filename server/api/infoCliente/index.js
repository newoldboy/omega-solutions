'use strict';

var express = require('express');
var controller = require('./info.controller');

var router = express.Router();
// TRAZ AS BASES DO CLIENTE
router.get('/:id', controller.baseCliente);
// TRAZ AS INFORMAÇÕES DA BASE DO CLIENTE
router.get('/:id/:base', controller.infoBaseCliente);
// TRAZ AS ATUALIZAÇÕES AGENDAS E AS ULTIMAS EFETUADAS
// router.post('/:id', controller.attAgendadas);

module.exports = router;