"use strict";
const express = require('express');
const auth = require('../controllers/auth');
const router = express.Router();

router.post('/login', auth.userLogin);

module.exports = router;
