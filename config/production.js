"use strict";
const path = require('path');
const rootDir = "/opt/hydroponics";
const logsDir = path.join(rootDir, "logs");
const commsDir = path.join(rootDir, "comms")

module.exports = {
    express: {
        "client": path.resolve("./client"),
    },
    auth: {
        "routeUser": path.resolve("./user.json"),
    },
    data: {
        log: id => path.join(logsDir, `${id}.log`),
        columns: id => path.join(logsDir, `${id}.json`),
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
            main: {
                id: "main",
                log: path.join(logsDir, "main.log"),
                columns: path.join(logsDir, "main.json"),
            }
        },
    },
    comunication: {
        path: commsDir
    },
}