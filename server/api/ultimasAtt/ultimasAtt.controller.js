'use strict';

var _ = require('lodash'),
    Sync = require('./ultimasAtt.model');
   
exports.tributacao = function (req, res) {
    Sync.trazTributacao(function (result, err) {
        
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};
function handleError(res, err) {
    return res.status(500).write('err');
}