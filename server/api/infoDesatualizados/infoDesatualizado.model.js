'use strict';

var _ = require('lodash'),
Firebird = require('node-firebird'),
moment = require('moment'),
utf8 = require("utf8"),
config = require('../../config/environment'),
utils = require('../../utils/utils'),
async = require('async'),
firebirdConfig = config.firebird,
pool = require('../../config/db'),
ftp = require('ftp');

exports.attClientes = function (cb) {    
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("SELECT DATA_HORA,MAXI,SUBTRACT,NOME_EMPRESA FROM LISTA_CLIENTS_DESATUALIZAD_WEB", function(err, result) {
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            if (result.length) {
                result.forEach(function(row) {                  
                    row.NOME_EMPRESA = ((row.NOME_EMPRESA !== null) ? buffToStr(row.NOME_EMPRESA) : row.NOME_EMPRESA);                    
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}
exports.attBases = function (cb) {  
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "select NOME_EMPRESA, BASE, DATA_HORA,MAXI,SUBTRACT from LISTA_BASES_DESATUALIZADAS", function(err, result) {
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            if (result.length) {
                result.forEach(function(row) {
                    row.NOME_EMPRESA = ((row.NOME_EMPRESA !== null) ? buffToStr(row.NOME_EMPRESA) : row.NOME_EMPRESA);                    
                    row.BASE = ((row.BASE !== null) ? buffToStr(row.BASE) : row.BASE);                    
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}
exports.attRepositorios = function (cb) {    
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "SELECT NOME_EMPRESA,REPOID,DATA_HORA,MAXI,SUBTRACT FROM LISTA_REPOSITORIOS_DESATUALIZAD", function(err, result) {
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
                });
            }
            if (result.length) {
                result.forEach(function(row) {
                    row.NOME_EMPRESA = ((row.NOME_EMPRESA !== null) ? buffToStr(row.NOME_EMPRESA) : row.NOME_EMPRESA);                  
                    row.REPOID = ((row.REPOID !== null) ? buffToStr(row.REPOID) : row.REPOID);  
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}

function buffToStr (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};