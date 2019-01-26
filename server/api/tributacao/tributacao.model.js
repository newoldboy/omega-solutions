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

exports.trazTributacao = function (cb) {    
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query( "select NOME, CAPTION from CAD_FORMULARIOS", function(err, result) {
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
                    row.NOME = ((row.NOME !== null) ? buffToStr(row.NOME) : row.NOME);                   
                    row.CAPTION = ((row.CAPTION !== null) ? buffToStr(row.CAPTION) : row.CAPTION);                     
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