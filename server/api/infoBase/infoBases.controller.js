'use strict';

var _ = require('lodash'),
    Sync = require('./infoBases.model');
   
exports.buscaVersaoBase = function (req, res) {
    req.params.id = '{' + req.params.id + '}'
    Sync.versaoBase(req.params.id, function (result, err) {        
        if (err) {
            return handleError(res, err);
        }        
        return res.status(200).json(result);
    });
};

exports.informacoesBase = function (req, res) {
    Sync.buscaInformacoesBase(req.params.base, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}