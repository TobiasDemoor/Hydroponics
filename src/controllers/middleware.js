"use strict";
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

module.exports.ensureAuthenticated = function(req, res, next) {
    if (!req.cookies.token) {
        return res.status(403).send({message: "Request debe contener token en cabecera"});
    }

    const token = req.cookies.token;
    const payload = jwt.decode(token, config.get("TOKEN_SECRET"));

    if (payload.exp <= moment.unix()) {
        return res.status(401).send({message: "Su sesion ha expirado"});
    }
    req.user = payload.sub;
    next();
};