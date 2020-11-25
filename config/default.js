"use strict";

module.exports = {
    express: {
        port: process.env.PORT || 5000,
    },
    jwt: {
        "TOKEN_SECRET": process.env.TOKEN_SECRET || "77aa1f16ed3d211d6ca12625",
        expTime: [1, 'd'],
    },
    auth: {
        default: "hydroponics",
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
        }
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
    }
}