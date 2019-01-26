var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var pool = require('../../config/db');

exports.setup = function (config) {
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'senha' // this is the virtual field on the model
    }, function(login, senha, done) {
        
        pool.get(function(err, db) {
            if (err)
            throw err;
            db.query("select USUARIO, SENHA, NOME, EMAIL from USUARIOS where usuario = ? and senha = ?", [(login + ''), (senha + '')], function (err, result) { 
                
                var user = result[0]
                if (user) {
                    user.NOME = ((user.NOME !== null) ? buffToStr(user.NOME) : user.NOME);
                    user.EMAIL = ((user.EMAIL !== null) ? buffToStr(user.EMAIL) : user.EMAIL);
                    user.USUARIO = ((user.USUARIO !== null) ? buffToStr(user.USUARIO) : user.USUARIO);                            
                    if (err) {
                        return db.detach(function(errDisconect) {
                            if (errDisconect) {
                                console.log(errDisconect);
                            }
                            return done(err);
                        });
                    }
                    
                    db.detach(function(err) {
                        if (err) {
                            console.log(err);
                        }
                        return done(false, user);
                    });
                } else {
                    done('Sem usuario', null);
                }
            });
            
        });
        
        pool.destroy();
    }));
};

function buffToStr(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}