"use strict";
const path = require('path');
const datadir = "./testFiles/logs/";

module.exports = {
    jwt: {
        "TOKEN_SECRET": "tokensecreto",
        "expTime": [2, "m"]
    },
    express: {
        "client": path.resolve("client/build"),
    },
    auth: {
        "routeUser": path.resolve("./testFiles/user.test.json"),
        "default": "admin"
    },
    data: {
        log: id => path.join(datadir, `${id}.log`),
        columns: id => path.join(datadir, `${id}.json`),
        sections: {
            ambient: {
                title: "Ambient",
                id: "ambient",
            },
            fishtank: {
                title: "Fish tank",
                id: "fishtank",
            },
            upperbed: {
                title: "Clay media grow bed",
                id: "upperbed",
            },
            mediumbed: {
                title: "First deep water grow bed",
                id: "mediumbed",
            },
            lowerbed: {
                title: "Second deep water grow bed",
                id: "lowerbed",
            },
            general: {
                log: path.resolve("./testFiles/general/general.state"),
                columns: path.resolve("./testFiles/general/general.json"),
            }
        },
    },
    comunication: {
        path: path.resolve("./testFiles/interaccion/")
    },
}