"use strict";
const express = require('express');
const control = require('../controllers/controlController');
const { ensureAuthenticated } = require('../controllers/middleware');

function getControlRoutes() {
    const router = express.Router();
    router.post('/actuator', ensureAuthenticated, control.changeActuators);
    // router.post('/columns', ensureAuthenticated, control.changeColumns)
    return router;
}

module.exports = { getControlRoutes }