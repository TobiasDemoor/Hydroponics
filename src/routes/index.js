"use strict";
const express = require('express');
const { getAuthRoutes } = require('./authRoutes');
const { getDataRoutes } = require('./dataRoutes');
const { getControlRoutes } = require('./controlRoutes');

function getRoutes() {
    const router = express.Router()
    router.use('/auth', getAuthRoutes())
    router.use('/data', getDataRoutes())
    router.use('/control', getControlRoutes())
    return router
}

module.exports = { getRoutes }