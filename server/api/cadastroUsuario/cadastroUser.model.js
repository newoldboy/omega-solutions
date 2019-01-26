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

exports.cadastrarUser = function (body, cb) {
        pool.get(function(err, db) {
            if (err)
            throw err;
            db.query("insert into WEB_USUARIOS (USUARIO,SENHA,NOME,EMAIL,NIVEL) values (?,?,?,?,?);", [body.usuario, body.senha, body.nome, body.email, body.nivel],function(err, result) {
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

exports.salvaArquivo = function (req, cb) {
    
    var codigo = req.params.id;
    var c = new ftp();
    c.on('ready', function() {
        c.mkdir('painel/' + codigo, function(err) { // cria a pasta 
            // primeiro parametro: anexo em formato buffer. Segundo parametro: diretorio e nome do arquivo 
            c.append(req.files.fileKey.data, ('./painel/' + codigo + '/' + req.files.fileKey.name), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Anexo salvo');
                }
                c.end(); // encera a conexão 
                cb();
            })
        });
    });
    c.connect({ // parametro para a conexão
        host: '192.168.25.104',
        user: 'emails_atendimento',
        password: '@@limberemails2018',
    });
    
}

exports.getSolicitacao = function (params, cb) {
    
    pool.get(function(err, db) {
        if (err)
            throw err;
        
        db.query("select OSOLICITACAO, OCLIENTE, ONOME_CLIENTE, OSOLICITANTE, ONOME_SOLICITANTE, ODATA_INCLUSAO, OANALISE, OTITULO, O_FASE, O_NOMEPROJETO, O_ETAPA_DT, O_ETAPA_RESPONSAVEL, O_FASE_STRING, O_DT_ENTREGA, O_NOTAS from WEB_GET_SOLICITACAO(?, ?)", [1, params.id], function (err, result) { 
            
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(result, err);
                });
            } else if (result.length) {
                result.forEach(function(row) {
                    row.ONOME_CLIENTE = ((row.ONOME_CLIENTE !== null) ? buffToStr(row.ONOME_CLIENTE) : row.ONOME_CLIENTE);
                    row.O_FASE = ((row.O_FASE !== null) ? buffToStr(row.O_FASE) : row.O_FASE);
                    row.O_NOMEPROJETO = ((row.O_NOMEPROJETO !== null) ? buffToStr(row.O_NOMEPROJETO) : row.O_NOMEPROJETO);
                    row.O_ETAPA_RESPONSAVEL = ((row.O_ETAPA_RESPONSAVEL !== null) ? buffToStr(row.O_ETAPA_RESPONSAVEL) : row.O_ETAPA_RESPONSAVEL);
                    row.O_FASE_STRING = ((row.O_FASE_STRING !== null) ? buffToStr(row.O_FASE_STRING) : row.O_FASE_STRING);
                    row.OANALISE = ((row.OANALISE !== null) ? buffToStr(row.OANALISE) : row.OANALISE);
                    row.OTITULO = ((row.OTITULO !== null) ? buffToStr(row.OTITULO) : row.OTITULO);
                    row.O_NOTAS = ((row.O_NOTAS !== null) ? buffToStr(row.O_NOTAS) : row.O_NOTAS);
                    row.ONOME_SOLICITANTE = ((row.ONOME_SOLICITANTE !== null) ? buffToStr(row.ONOME_SOLICITANTE) : row.ONOME_SOLICITANTE);
                    
                });
            }
            db.detach(function(err) {
                if (err) {
                    console.log(err);
                }
                return cb(result[0]);
            });
        });
    });
    pool.destroy();
}

exports.historico = function (params, cb) {
    
    pool.get(function(err, db) {
        if (err)
            throw err;
        
        db.query("select DESCRICAO, DATA, USUARIO, GRUPO_USUARIO as SETOR, GRUPO_USUARIO_NOME as SETORNOME from WEB_GET_HISTORICO_SOLICITACAO(?,?) ", [1, params.id], function (err, result) {
            
            if (err) {
                return db.detach(function(errDisconect) {
                    if (errDisconect) {
                        console.log(errDisconect);
                    }
                    return cb(result, err);
                });
            } else if (result.length) {
                var usuarioAnterior = null;
                var classAnterior = null;
                result.forEach(function(row, index) {
                    row.USUARIO = ((row.USUARIO !== null) ? buffToStr(row.USUARIO) : row.USUARIO);
                    row.SETORNOME = ((row.SETORNOME !== null) ? buffToStr(row.SETORNOME) : row.SETORNOME);
                    row.DESCRICAO = ((row.DESCRICAO !== null) ? buffToStr(row.DESCRICAO) : row.DESCRICAO);
                    row.DESCRICAO = ((row.DESCRICAO !== null) ? (row.DESCRICAO).replace(/<br>/g, '') : row.DESCRICAO);
                    if (index == 0) {
                        usuarioAnterior = row.USUARIO;
                        row.CLASS = 'atendente';
                        classAnterior = 'atendente';
                    }
                    
                    if (usuarioAnterior !== row.USUARIO) {
                        if (classAnterior == 'atendente') {
                            row.CLASS = 'cliente';
                            classAnterior = 'cliente';
                        } else {
                            row.CLASS = 'atendente';
                            classAnterior = 'atendente';
                        }
                        usuarioAnterior = row.USUARIO;
                    } else {
                        row.CLASS = classAnterior;
                    }
                });
            }
            db.detach(function(err) {
                if (err) {
                    console.log(err);
                }
                return cb(result);
            });
        });
    });
    pool.destroy();
}

exports.salvaMensagem = function (body, cb) {    
    pool.get(function(err, db) {
        if (err)
            throw err;        
            
        db.query(" ", [1, body.solicitacao, 74, body.msg], function (err, result) {             
            if (err) {
              cb(null, err);
            }
            result.NOME = (result.NOME) ? buffToStr(result.NOME) : result.NOME;
            cb(result);

            db.detach();
        });        
    });
    pool.destroy();
}

function buffToStr(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}