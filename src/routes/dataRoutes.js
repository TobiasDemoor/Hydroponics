"use strict";
const express = require('express');
const data = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');


function getDataRoutes() {
    const router = express.Router();
    router.get('/recent/:id', authMiddleware, data.getRecent);
    router.post('/columns', authMiddleware, data.changeColumns);
    router.get('/sections', authMiddleware, data.getSections);
    return router;
}

module.exports = { getDataRoutes }