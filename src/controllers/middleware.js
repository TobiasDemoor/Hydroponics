"use strict";
const jwt = require('jwt-simple');
const config = require('config');
const { noCookieInRequest, invalidToken } = config.get("strings");

async function ensureAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        res.status(403).send({ message: noCookieInRequest });
    } else {
        try {
            const payload = jwt.decode(token, Buffer.from(config.jwt.TOKEN_SECRET, 'hex'));
            req.user = payload.sub;
            next();
        } catch (e) {
            res.status(401).send({ message: invalidToken });
        }
    }
};

module.exports = { ensureAuthenticated }