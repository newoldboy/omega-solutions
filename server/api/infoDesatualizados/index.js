'use strict';

var express = require('express');
var controller = require('./infoDesatualizado.controller');

var router = express.Router();

router.get('/clientes', controller.trazerClienteDesatualizados);
router.get('/bases', controller.trazerBasesDesatualizados);
router.get('/repositorios', controller.trazerRepositoriosDesatualizados);

module.exports = router;
