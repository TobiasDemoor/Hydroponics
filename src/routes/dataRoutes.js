"use strict";
const express = require('express');
const { ensureAuthenticated } = require('../controllers/middleware');

function getDataRoutes() {
    const router = express.Router();
    router.get('/private', ensureAuthenticated, (req, res) => {
        // TODO: todo jeje
        return res.status(200);
    });
    return router;
}

module.exports = { getDataRoutes }