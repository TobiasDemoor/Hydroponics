"use strict";
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

async function ensureAuthenticated(req, res, next) {
    if (!req.cookies.token) {
        res.status(403).send({message: "Request debe contener token en cabecera"});
    } else {
        const token = req.cookies.token;
        const payload = jwt.decode(token, config.jwt.TOKEN_SECRET);
    
        if (payload.exp <= moment.unix()) {
            res.status(401).send({message: "Sesion ha expirado"});
        } else {
            req.user = payload.sub;
            next();
        }
    }
};

module.exports = {ensureAuthenticated}