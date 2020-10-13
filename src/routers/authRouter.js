"use strict";
const express = require('express');
const auth = require('../controllers/auth');
const { ensureAuthenticated } = require('../controllers/middleware');
const router = express.Router();

router.post('/login', auth.userLogin);

router.post('/modify', ensureAuthenticated, auth.userModify);

module.exports = router;
