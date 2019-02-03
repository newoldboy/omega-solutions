process.env.NODE_ENV = process.env.NODE_ENV || 'run';

var express = require('express'),
pg = require('pg'),
config = require('./config/environment')
app = express(),
server = require('http').createServer(app);

require('./routes')(app);

server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


exports = module.exports = app;