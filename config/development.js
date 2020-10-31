"use strict";
const path = require('path')
const datadir = "./testFiles/logs/"

module.exports = {
    express: {
        "client": path.resolve("client/build"),
    },
    auth: {
        "routeUser": path.resolve("./testFiles/user.json"),
    },
    data: {
        sections: {
            ambient: {
                title: "Ambient",
                log: path.join(datadir, "ambient.log"),
                columns: path.join(datadir, "ambient.json")
            },
            fishtank: {
                title: "Fish tank",
                log: path.join(datadir, "fishtank.log"),
                columns: path.join(datadir, "fishtank.json")
            },
            claymediagrowbed: {
                title: "Clay media grow bed",
                log: path.join(datadir, "claymediagrowbed.log"),
                columns: path.join(datadir, "claymediagrowbed.json")
            },
            deepwatergrowbed0: {
                title: "First deep water grow bed",
                log: path.join(datadir, "deepwatergrowbed0.log"),
                columns: path.join(datadir, "deepwatergrowbed0.json")
            },
            deepwatergrowbed1: {
                title: "Second deep water grow bed",
                log: path.join(datadir, "deepwatergrowbed1.log"),
                columns: path.join(datadir, "deepwatergrowbed1.json")
            },
            
        },
    },
    comunication: {
        path: path.resolve("./testFiles/interaccion/")
    },
}