"use strict"
const express = require('express');
const authRouter = require('./authRouter');
const dataRouter = require('./dataRouter');

const router = express.Router();

router.use('/auth', authRouter)

router.use('/data', dataRouter)

router.get('/getList', (req, res) => {
    var list = ['item1', 'item2', 'item3'];
    res.json(list);
    console.log('sent list items');
});

module.exports = router;