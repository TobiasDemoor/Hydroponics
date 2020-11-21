"use strict";
const express = require('express');
const compression = require('compression');
const config = require('config');
const path = require('path')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const { getRoutes } = require('./routes');

async function startServer(port = process.env.PORT) {
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

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            console.info(`Connected to port: ${server.address().port}`)

            // this block of code turns `server.close` into a promise API
            const originalClose = server.close.bind(server)

            server.close = async () => {
                return new Promise(resolveClose => {
                    originalClose(resolveClose)
                })
            }
            // this ensures that we properly close the server when the program exists
            setupCloseOnExit(server)
            // resolve the whole promise with the express server
            resolve({ app, server })
        })
    })
}

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

// ensures we close the server in the event of an error.

function setupCloseOnExit(server) {
    // thank you stack overflow
    // https://stackoverflow.com/a/14032965/971592
    async function exitHandler(options = {}) {
        await server
            .close()
            .then(() => {
                console.info('Server has been shut down successfuly')
            })
            .catch(e => {
                console.warn('An error ocurred while shutting down the server', e.stack)
            })
        if (options.exit) process.exit()
    }

    // do something when app is closing
    process.on('exit', exitHandler)

    // catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(null, { exit: true }))

    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }))
}

module.exports = { startServer }