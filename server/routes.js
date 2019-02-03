/**
* Main application routes
*/

'use strict';

var errors = require('./components/errors'),
path = require('path');


module.exports = function (app) {
  

  app.use('/',(req, res, next) => {
    var pg = require('pg');
    
    const config = {
      user: 'postgres',
      database: 'omega',
      password: 'masterkey',
      port: 5432
  };

    var pool = new pg.Pool(config);

    pool.connect(function(err, client, done){
      if (err) {
        console.log(err);
        return;
      }
      client.query('select * from Usuario', function(err, retorno) {
        done();
        if (err){          
          console.log(err);
          return;
        }
        console.log(retorno.rows);        
      })
    })
    
  })
  
  // app.use('/auth', require('./auth'));
  // app.use('/api/clientes', require('./api/clientes'));
  // app.use('/api/infoCliente',require('./api/infoCliente'));  
  // app.use('/api/tributacao',require('./api/tributacao'));
  // app.use('/api/atualizacao',require('./api/atualizacao'));
  // app.use('/api/cadastroUsuario', require('./api/cadastroUsuario'));
  // app.use('/api/infoDesatualizados', require('./api/infoDesatualizados'));  
  // app.use('/api/infoBase', require('./api/infoBase'));
  // app.use('/api/solicitacoes', require('./api/solicitacoes'));
  
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
  .get(errors[404]);
  
  app.route('/*')
  .get(function (req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
  });
};