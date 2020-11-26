"use strict";
const path = require('path');
const rootDir = './testFiles'
const datadir = path.join(rootDir, 'logs');
const commsDir = path.join(rootDir, 'comms');

module.exports = {
    express: {
        port: process.env.PORT || 5000,
        client: path.resolve('client/build'),
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "77aa1f16ed3d211d6ca12625",
        expTime: [1, 'd'],
    },
    auth: {
        default: "hydroponics",
        'routeUser': path.resolve('./testFiles/user.json'),
    },
    strings: {
        // auth
        badLogin: "Incorrect username or password",
        successChangeLogin: "The user has been successfuly modified",
        noCookieInRequest: "Request must contain token as cookie",

        // general
        invalidToken: "Invalid token",
        invalidId: "Invalid section id",
        parameterMissing: "Parameter is missing",

        //control
        timeoutErrorMsg: 'No response from control program',
    },
    data: {
        separador: ',',
        cantRecientes: 100,
        types: {
            actuator: "actuator"
        },
        actuators: {
            on: "on",
            off: "off"
        },
        log: id => path.join(datadir, `${id}.log`),
        columns: id => path.join(datadir, `${id}.json`),
        sections: {
            ambient: {
                title: 'Ambient',
                id: 'ambient',
            },
            fishtank: {
                title: 'Fish tank',
                id: 'fishtank',
            },
            upperbed: {
                title: 'Clay media grow bed',
                id: 'upperbed',
            },
            mediumbed: {
                title: 'First deep water grow bed',
                id: 'mediumbed',
            },
            lowerbed: {
                title: 'Second deep water grow bed',
                id: 'lowerbed',
            },
            general: {
                id: 'general',
                log: path.resolve('./testFiles/general/general.state'),
                columns: path.resolve('./testFiles/general/general.json'),
            }
        },
    },
    comunication: {
        path: commsDir,
        timeout: 8000
    },
}