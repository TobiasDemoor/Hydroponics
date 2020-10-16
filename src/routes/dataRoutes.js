"use strict";
const express = require('express');
const data = require('../controllers/dataController');
const { ensureAuthenticated } = require('../controllers/middleware');

function getDataRoutes() {
    const router = express.Router();
    router.get('/recent', ensureAuthenticated, data.getRecent);
    return router;
}

module.exports = { getDataRoutes }