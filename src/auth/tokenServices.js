"use strict";
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');
const User = require('./User');

/**
 * @param {User} user 
 * @param {[number, string]} exp
 * @returns {string} JWT with username, initialization time and expiration time
 */
function createToken(user, exp = config.jwt.expTime) {
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(...exp).unix()
    };
    return jwt.encode(payload, Buffer.from(config.jwt.TOKEN_SECRET, 'hex'));
};

module.exports = { createToken }
