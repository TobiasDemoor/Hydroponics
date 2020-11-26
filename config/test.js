"use strict";
const path = require('path');
const datadir = './testFiles/logs'

module.exports = {
    jwt: {
        TOKEN_SECRET: "test",
        expTime: [2, "m"]
    },
    auth: {
        routeUser: path.resolve("./testFiles/user.test.json"),
        default: "test"
    },
    data: {
        columns: id => path.join(datadir, `${id}.test.json`),
        columnsOrig: id => path.join(datadir, `${id}.json`)
    },
    comunication: {
        timeout: 2000
    }
}