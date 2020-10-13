"use strict";
const express = require('express');
const config = require('config');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./routers/mainRouter');

const app = express();

// middleware
app.use(cookieParser());

app.use(morgan('common'));

app.use(express.static(config.express.client));

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/api', router);

app.get('*', (req, res) => {
    res.sendFile(path.join(config.express.client, 'index.html'));
});


app.listen(config.express.port);
console.log('App en el puerto ' + config.express.port);

