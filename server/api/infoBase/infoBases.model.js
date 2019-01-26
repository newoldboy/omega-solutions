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

exports.versaoBase = function (id,cb) { 
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("select VALOR from VER_CLI_BASES_DADOS where PARAMETRO = 'VERSAO_PAR_BD' and CNAME = ?", [id],function(err, result) {
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
                    row.VALOR = ((row.VALOR !== null) ? buffToStr(row.VALOR) : row.VALOR);
                });
            }
            return cb(result);
        });
    });
    pool.destroy(); 
}

exports.buscaInformacoesBase = function (base,cb) { 
    pool.get(function(err, db) {
        if (err)
        throw err;
        db.query("select VERSAO,DATAHORA_INICIO,REPOSITORIO,ARQ_ATUALIZACAO,WS,VALIDATE,BACKUP,CANCELADO,USU_CANCELOU,DATAHORA_CANCELADO,EXPORTADO,DATAHORA_EXPORTADO from VER_CLI_AGENDA_ATU where BASE = ? order by SEQ  desc", [base],function(err, result) {
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
                    row.VALIDATE = ((row.VALIDATE !== null) ? buffToStr(row.VALIDATE) : row.VALIDATE);   
                    row.BACKUP = ((row.BACKUP !== null) ? buffToStr(row.BACKUP) : row.BACKUP);   
                    row.CANCELADO = ((row.CANCELADO !== null) ? buffToStr(row.CANCELADO) : row.CANCELADO);   
                    row.USU_CANCELOU = ((row.USU_CANCELOU !== null) ? buffToStr(row.BASE) : row.USU_CANCELOU);                    
                    row.VERSAO = ((row.VERSAO !== null) ? buffToStr(row.VERSAO) : row.VERSAO);
                    row.EXPORTADO = ((row.EXPORTADO !== null) ? buffToStr(row.EXPORTADO) : row.EXPORTADO);
                    row.REPOSITORIO = ((row.REPOSITORIO !== null) ? buffToStr(row.REPOSITORIO) : row.REPOSITORIO);                    
                    row.ARQ_ATUALIZACAO = ((row.ARQ_ATUALIZACAO !== null) ? buffToStr(row.ARQ_ATUALIZACAO) : row.ARQ_ATUALIZACAO);             
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