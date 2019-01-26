'use strict';

var _ = require('lodash'),
    Sync = require('./solicitacoes.model');
   
exports.buscaEmExecucao = function (req,res) {
    Sync.emExecucao(function (result, err) {
        
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};
function handleError(res, err) {
    return res.status(500).write('err');
}