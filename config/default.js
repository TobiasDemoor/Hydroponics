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
            path.resolve("./prueba.log"),
            path.resolve("./temperatures.log")
        ],
        cantRecientes: 100,
        columns: [
            { label: "Tiempo", align: "center", id:"time" },
            { label: "Temperatura 1", align: "center", id:"temp1" },
            { label: "Temperatura 2", align: "center", id:"temp2" },
            { label: "Temperatura 3", align: "center", id:"temp3" }
        ]
    }
}