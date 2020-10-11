"use strict";
const express = require('express');
const config = require('config');
const path = require('path')
const router = require('./routers/mainRouter');

const app = express();

app.use(express.static(config.get('client')));

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(config.get('client'), 'index.html'));
});

const port = config.get('port');

app.listen(port);

console.log('App en el puerto ' + port);

