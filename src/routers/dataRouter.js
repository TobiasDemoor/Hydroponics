"use strict";
const express = require('express');
const { ensureAuthenticated } = require('../controllers/middleware');
const router = express.Router();

router.get('/private', ensureAuthenticated, (req, res) => {
    // TODO: todo jeje
    return res.status(200);
});

module.exports = router