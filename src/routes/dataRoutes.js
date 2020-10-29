"use strict";
const express = require('express');
const data = require('../controllers/dataController');
const { ensureAuthenticated } = require('../controllers/middleware');

function getDataRoutes() {
    const router = express.Router();
    router.get('/recent/:id', ensureAuthenticated, data.getRecent);
    router.post('/columns', ensureAuthenticated, data.changeColumns)
    return router;
}

module.exports = { getDataRoutes }