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

exports.guardarAgendamento = function (id,body,cb) {   
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("insert into VER_CLI_AGENDA_ATU (CNAME,BASE,VERSAO,DATAHORA_INICIO,REPOSITORIO,ARQ_ATUALIZACAO,USU_AGENDOU,VALIDATE,BACKUP,EXPORTADO)values(?,?,?,?,?);", [id, body.repositorio,body.usuario,body.backup,body.picker],function(err, result) {
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(false, err);
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

exports.trazUltimasAtt = function (base,id,cb) { 
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("select BASE,VERSAO,DATA_HORA_INI,REPOSITORIO_ATT,USUARIO_AGENDOU from LISTA_ULT_ATU_AGEND(?,?)", [id,base],function(err, result) {
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
                    row.USUARIO_AGENDOU = ((row.USUARIO_AGENDOU !== null) ? buffToStr(row.USUARIO_AGENDOU) : row.USUARIO_AGENDOU);                             
                    row.VERSAO = ((row.VERSAO !== null) ? buffToStr(row.VERSAO) : row.VERSAO);
                    row.REPOSITORIO_ATT = ((row.REPOSITORIO_ATT !== null) ? buffToStr(row.REPOSITORIO_ATT) : row.REPOSITORIO_ATT);                   
                });
            }
            return cb(result);
        });
    });
    pool.destroy(); 
}