/* eslint-disable no-undef */
"use strict";
module.exports = {
    express: {
        "port": process.env.PORT || 5000,
        "client": "client",
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "tokensecreto",
        "expTime": [1, 'd'],
    },
    auth: {
        "routeUser": "user.json",
        "default": "admin",
    },
    data: {
        separador: ',',
        archivos: [
            "./prueba.log",
            "./temperatures.log"
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