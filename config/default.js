/* eslint-disable no-undef */
"use strict";
module.exports = {
    express: {
        "port": process.env.PORT || 5000,
        "client": "client/build",
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "tokensecreto",
        "expTime": [1, 'd'],
    },
    auth: {
        "routeUser": "user.json",
        "default": "admin",
    }
}