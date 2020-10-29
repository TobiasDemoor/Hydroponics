"use strict";
const path = require('path')

module.exports = {
    express: {
        "port": process.env.PORT || 5000,
        "client": path.resolve("client/build"),
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "tokensecreto",
        "expTime": [1, 'd'],
    },
    auth: {
        "routeUser": path.resolve("user.json"),
        "default": "hydropon",
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
    },
    comunication: {
        path: path.resolve("./interaccion/")
    },
    strings: {
        // auth
        badLogin: "Incorrect username or password",
        unkErrorLogin: "An unknown error ocurred at log in",
        successChangeLogin: "The user has been successfuly modified",
        unkErrorChangeLogin: "An unkown error ocurred while changing the login credentials",
    }
}