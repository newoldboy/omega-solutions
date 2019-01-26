'use strict';

var _ = require('lodash'),
Sync = require('./info.model');
// TRAZ AS BASES DO CLIENTE
exports.baseCliente = function (req, res) {   
    req.params.id = '{' + req.params.id + '}'
    Sync.trazBase(req.params.id, function (result, err) {
        if (err) {
            return handleError(res, err);
        }        
        return res.status(200).json(result);
    });
};
// TRAZ AS INFORMAÇÕES DA BASE DO CLIENTE
exports.infoBaseCliente = function (req, res) {    
    req.params.id = '{' + req.params.id + '}'
    Sync.infoBase(req.params.id, req.params.base, function (result, err) {
        if (err) {
            return handleError(res, err);
        }            
        return res.status(200).json(result);
    });
};
function handleError(res, err) {
    return res.status(500).write('err');
}