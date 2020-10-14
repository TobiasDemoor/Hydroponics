"use strict";
const express = require('express');
const { getAuthRoutes } = require('./authRoutes');
const { getDataRoutes } = require('./dataRoutes');

function getRoutes() {
    const router = express.Router()
    router.use('/auth', getAuthRoutes())
    router.use('/data', getDataRoutes())
    router.get('/getList', (req, res) => {
        var list = ['item1', 'item2', 'item3'];
        res.json(list);
        console.log('sent list items');
    });
    return router
}

module.exports = { getRoutes }