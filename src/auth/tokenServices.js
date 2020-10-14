"use strict";
const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('config');

module.exports.createToken = function(user) {
    const payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(...config.jwt.expTime).unix()
    };
    return jwt.encode(payload, config.jwt.TOKEN_SECRET);
};
