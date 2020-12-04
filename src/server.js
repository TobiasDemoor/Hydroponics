const express = require('express');
const compression = require('compression');
const config = require('config');
const { client } = config.get('express');
const path = require('path')
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const moment = require('moment');
const bodyParser = require('body-parser')
const { getRoutes } = require('./routes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express()

// log de requests
if (process.env.NODE_ENV === 'production') {
    morgan.token('date', () => moment().format('YYYY-MM-DD HH:mm'));
    app.use(morgan('[:date] ":method :url HTTP/:http-version" :status '))
} else {
    app.use(morgan('dev'))
}

// middleware
app.use(compression());
app.use(cookieParser());
app.use(express.static(client));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// routes
app.use('/api', getRoutes())
if (process.env.NODE_ENV !== 'test') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(client, 'index.html'));
    });
}

app.use(errorMiddleware);

module.exports = app;
