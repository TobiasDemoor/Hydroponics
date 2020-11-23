"use strict";
const express = require('express');
const auth = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');


function getAuthRoutes() {
    const router = express.Router();
    router.post('/login', auth.userLogin);
    router.post('/modify', authMiddleware, auth.userModify);
    return router;
}

module.exports = { getAuthRoutes };
