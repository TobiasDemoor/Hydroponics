"use strict";
const express = require('express');
const control = require('../controllers/controlController');
const { ensureAuthenticated } = require('../controllers/middleware');

function getControlRoutes() {
    const router = express.Router();
    router.post('/actuator', ensureAuthenticated, control.changeActuators);
    return router;
}

module.exports = { getControlRoutes }