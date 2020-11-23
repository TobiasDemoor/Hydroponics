const express = require('express');
const compression = require('compression');
const config = require('config');
const path = require('path')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { getRoutes } = require('./routes');

// here's our generic error handler for situations where we didn't handle
// errors properly
function errorMiddleware(error, req, res, next) {
    if (res.headersSent) {
        next(error)
    } else {
        console.error(error)
        res.status(500)
        res.json({
            message: error.message,
            // we only add a `stack` property in non-production environments
            ...(process.env.NODE_ENV === 'production' ? null : { stack: error.stack }),
        })
    }
}

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
app.use(errorMiddleware)

// routes
app.use('/api', getRoutes())
app.get('*', (req, res) => {
    res.sendFile(path.join(config.express.client, 'index.html'));
});

module.exports = app;
