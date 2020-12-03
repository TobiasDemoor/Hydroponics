"use strict";
require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });
const config = require('config');
const { startServer } = require('./start');

startServer(config.express.port);require('log-timestamp')();
