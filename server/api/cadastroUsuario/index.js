'use strict';

var express = require('express');
var controller = require('./cadastroUser.controller');

var router = express.Router();

router.post('/', controller.novoUsuario);



module.exports = router;
