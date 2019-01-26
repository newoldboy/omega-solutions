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

// TRAZ O NOME DA BASE----------
exports.trazBase = function (id, cb) {
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "Select u.BASE from VER_CLI_BASES u where u.cname = ?", [id], function(err, result) {
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
                    row.BASE = ((row.BASE !== null) ? buffToStr(row.BASE) : row.BASE);                   
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}
// -----------------
// TRAZ AS INFORMAÇÕES DA(S) BASE(S) SELECIONADAS A CIMA ------------------
exports.infoBase = function (id,base,cb) {    
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "select BASE, PARAMETRO, VALOR from VER_CLI_BASES_DADOS where cname = ? and BASE = ?",[id,base] , function(err, result) {
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
                    row.BASE = ((row.BASE !== null) ? buffToStr(row.BASE) : row.BASE);                    
                    row.PARAMETRO = ((row.PARAMETRO !== null) ? buffToStr(row.PARAMETRO) : row.PARAMETRO);
                    row.VALOR = ((row.VALOR !== null) ? buffToStr(row.VALOR) : row.VALOR);             
                });
            }
            return cb(result);
        });
    });
    pool.destroy();
}
// ------------------------------

function buffToStr (buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
};