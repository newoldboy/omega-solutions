/**
 * db.js configuration
 */

'use strict';

var config = require('./environment'),
    Firebird = require('node-firebird'),
    firebirdConfig = config.firebird;

var pool = Firebird.pool(5, firebirdConfig);

module.exports = pool;