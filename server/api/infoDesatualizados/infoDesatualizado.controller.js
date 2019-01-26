'use strict';

var _ = require('lodash'),
    Sync = require('./infoDesatualizado.model');
   
exports.trazerClienteDesatualizados = function (req, res) {
    Sync.attClientes(function (result, err) {
        if (err) {
            return handleError(res, err);
        }        
        return res.status(200).json(result);
    });
};

exports.trazerBasesDesatualizados = function (req, res) {
    Sync.attBases(function (result, err) {
        if (err) {
            return handleError(res, err);
        }        
        return res.status(200).json(result);
    });
};

exports.trazerRepositoriosDesatualizados = function (req, res) {
    Sync.attRepositorios(function (result, err) {
        if (err) {
            return handleError(res, err);
        }
        
        return res.status(200).json(result);
    });
};

function handleError(res, err) {
    return res.status(500).write('err');
}