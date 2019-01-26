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

exports.clientesHolding = function (cb) {
    
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "select CNAME,VERSAO,NOME,PAR_BD,ATUALIZACAO from LISTA_CLIENTE_WEB order by PAR_BD desc", function(err, result) {
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
                    row.CNAME = ((row.CNAME !== null) ? buffToStr(row.CNAME) : row.CNAME);                    
                    row.NOME = ((row.NOME !== null) ? buffToStr(row.NOME) : row.NOME);
                    row.PAR_BD = ((row.PAR_BD !== null) ? buffToStr(row.PAR_BD) : row.PAR_BD);
                    row.ATUALIZACAO = ((row.ATUALIZACAO !== null) ? buffToStr(row.ATUALIZACAO) : row.ATUALIZACAO);                    
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