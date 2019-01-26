'use strict';

var _ = require('lodash'),
Sync = require('./cadastroUser.model');


exports.novoUsuario = function (req, res) {
    Sync.cadastrarUser(req.body, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(result);
        
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}