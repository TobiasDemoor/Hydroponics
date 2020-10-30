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
        default: "hydropon",
    },
    data: {
        separador: ',',
        cantRecientes: 100,
    },
    strings: {
        // auth
        badLogin: "Incorrect username or password",
        unkErrorLogin: "An unknown error ocurred at log in",
        successChangeLogin: "The user has been successfuly modified",
        unkErrorChangeLogin: "An unkown error ocurred while changing the login credentials",
    }
}