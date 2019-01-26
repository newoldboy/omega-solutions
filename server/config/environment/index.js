'use strict';

var path = require('path'),
  _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 7777,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'angular-fullstack-secret'
  },
  idusuariosessao : null,
  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // FireBird connection options  
  firebird: {
    host: 'localhost', 
    port: 3050,
    database: 'F:/bases/OMEGA.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
    lowercase_keys: false,
    role: null,
    pageSize: 4096
  },  
  secretOrKey: 'masterkey',
  listUsers: [],
  google: {
    clientID: process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL: (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.extend(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});