"use strict";
require('log-timestamp')();
const config = require('config');
const { startServer } = require('./start');

startServer(config.express.port);