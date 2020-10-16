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
    },
    data: {
        separador: ',',
        archivos: [
            "./prueba.log",
            "./prueba1.log"
        ],
        columns: [
            { label: "Tiempo", align: "center", id:"1" },
            { label: "columna 2", align: "center", id:"2" },
            { label: "columna 3", align: "center", id:"3" },
            { label: "columna 4", align: "center", id:"4" },
            { label: "columna 5", align: "center", id:"5" },
            { label: "columna 6", align: "center", id:"6" },
            { label: "columna 7", align: "center", id:"7" }
        ]
    }
}