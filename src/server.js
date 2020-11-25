const express = require('express');
const compression = require('compression');
const config = require('config');
const path = require('path')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { getRoutes } = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express()

// middleware
app.use(compression());
app.use(cookieParser());
app.use(morgan('common'));
app.use(express.static(config.express.client));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// routes
app.use('/api', getRoutes())
if (process.env.NODE_ENV !== 'test') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(config.express.client, 'index.html'));
    });
}

app.use(errorMiddleware) ;

module.exports = app;
