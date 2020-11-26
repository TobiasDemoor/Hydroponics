"use strict";
const express = require('express');
const control = require('../controllers/controlController');
const authMiddleware = require('../middleware/authMiddleware');


function getControlRoutes() {
    const router = express.Router();
    router.post('/actuator', authMiddleware, control.changeActuators);
    router.post('/update', authMiddleware, control.update);
    return router;
}

module.exports = { getControlRoutes }