"use strict";
const path = require('path')

module.exports = {
    express: {
        "client": path.resolve("client"),
    },
    auth: {
        "routeUser": path.resolve("./testFiles/user.json"),
    },
    data: {
        archivos: [
            path.resolve("./testFiles/temperatures0.log"),
            path.resolve("./testFiles/temperatures1.log")
        ],
        columns: [
            path.resolve("./testFiles/temperatures0.json"),
            path.resolve("./testFiles/temperatures1.json")
        ]
    },
    comunication: {
        path: path.resolve("./testFiles/interaccion/")
    },
}