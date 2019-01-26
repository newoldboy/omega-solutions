'use strict';

var express = require('express');
var controller = require('./infoBases.controller');

var router = express.Router();

router.get('/:id', controller.buscaVersaoBase);
router.get('/base/:base', controller.informacoesBase);

module.exports = router;