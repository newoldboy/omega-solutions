'use strict';

var _ = require('lodash'),
    Sync = require('./clientes.model');
   
exports.trazerCliente = function (req, res) {
    Sync.clientesHolding(function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}