"use strict"
const express = require('express');
const authRouter = require('./authRouter');
const dataRouter = require('./dataRouter');

const router = express.Router();

router.use('/api/auth', authRouter)

router.use('/api/data', dataRouter)

router.get('/api/getList', (req, res) => {
    var list = ['item1', 'item2', 'item3'];
    res.json(list);
    console.log('sent list items');
});

module.exports = router;