"use strict";
const hash = require("../auth/hashServices");

module.exports = class User {
    /**
     * 
     * @param {String} username 
     * @param {String} password 
     * @param {String} salt 
     */
    constructor(username, password, salt = null) {
        if (!salt) {
            const hashResult = hash.saltHashPassword(password);
            this.id = 0;
            this.username = username.replace("\n", "");
            this.password = hashResult.passwordHash;
            this.salt = hashResult.salt; 
            console.log("Usuario nuevo creado");
        } else {
            this.id = 0;
            this.username = username;
            this.password = password;
            this.salt = salt; 
        }
    }
}