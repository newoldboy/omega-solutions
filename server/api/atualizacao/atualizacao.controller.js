'use strict';

var _ = require('lodash'),
Sync = require('./atualizacao.model');

exports.salvarAgendamento = function (req, res) {
    req.params.id = '{' + req.params.id + '}'
    Sync.guardarAgendamento(req.params.id,req.body, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

exports.buscaUltimasAtt = function (req, res) {
    req.params.id = '{' + req.params.id + '}'
    Sync.trazUltimasAtt(req.params.id,req.params.base, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

exports.buscaHistoricoBase = function(req, res) {
    req.params.id = '{' + req.params.id + '}'
    Sync.historicoBase(req.params.id, function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}