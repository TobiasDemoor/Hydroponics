"use strict";
const express = require('express');
const { getAuthRoutes } = require('./authRoutes');
const { getDataRoutes } = require('./dataRoutes');

function getRoutes() {
    const router = express.Router()
    router.use('/auth', getAuthRoutes())
    router.use('/data', getDataRoutes())
    return router
}

module.exports = { getRoutes }