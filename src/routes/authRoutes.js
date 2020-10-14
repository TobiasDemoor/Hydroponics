"use strict";
const express = require('express');
const auth = require('../controllers/authController');
const { ensureAuthenticated } = require('../controllers/middleware');

function getAuthRoutes() {
    const router = express.Router();
    router.post('/login', auth.userLogin);
    router.post('/modify', ensureAuthenticated, auth.userModify);
    return router;
}

module.exports = { getAuthRoutes };
