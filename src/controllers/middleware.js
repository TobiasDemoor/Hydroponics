"use strict";
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

async function ensureAuthenticated(req, res, next) {
    if (!req.cookies.token) {
        res.status(403).send({message: "Request must contain token as cookie"});
    } else {
        const token = req.cookies.token;
        const payload = jwt.decode(token, Buffer.from(config.jwt.TOKEN_SECRET, 'hex'));
    
        if (payload.exp <= moment.unix()) {
            res.status(401).send({message: "Session expired"});
        } else {
            req.user = payload.sub;
            next();
        }
    }
};

module.exports = {ensureAuthenticated}