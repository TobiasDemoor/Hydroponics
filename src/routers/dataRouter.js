"use strict";
const express = require('express');
const middleware = require('../controllers/middleware');
const router = express.Router();

router.get('/private', middleware.ensureAuthenticated, (req, res) => {
    // TODO: todo jeje
    res.status(200);
});

module.exports = router