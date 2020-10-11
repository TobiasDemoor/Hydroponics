"use strict";
const hash = require("../services/hashServices");

module.exports = class User {
    constructor(username, password) {
        const hashResult = hash.saltHashPassword(password);
        if (User.lastID) {
            User.lastID += 1;
        } else {
            // TODO: reemplazar si es que va a haber mas de un usuario
            User.lastID = 1;
        }
        this.id = User.lastID;
        this.username = username;
        this.password = hashResult.passwordHash;
        this.salt = hashResult.salt; 
        console.log("Usuario nuevo creado");
    }
}