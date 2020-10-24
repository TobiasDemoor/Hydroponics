/* eslint-disable no-undef */
const path = require('path')
"use strict";
module.exports = {
    express: {
        "port": process.env.PORT || 5000,
        "client": path.resolve("client"),
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "tokensecreto",
        "expTime": [1, 'd'],
    },
    auth: {
        "routeUser": path.resolve("user.json"),
        "default": "admin",
    },
    data: {
        separador: ',',
        archivos: [
            path.resolve("./testFiles/temperatures0.log"),
            path.resolve("./testFiles/temperatures1.log")
        ],
        cantRecientes: 100,
        columns: [
            path.resolve("./testFiles/temperatures0.json"),
            path.resolve("./testFiles/temperatures1.json")
        ]
    }
}