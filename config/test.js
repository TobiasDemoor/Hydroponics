"use strict";
const path = require('path');

module.exports = {
    jwt: {
        TOKEN_SECRET: "test",
        expTime: [2, "m"]
    },
    auth: {
        routeUser: path.resolve("./testFiles/user.test.json"),
        default: "test"
    }
}