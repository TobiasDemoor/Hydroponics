"use strict";
var crypto = require("crypto");

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString("hex") /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

function cleanString(str) {
    const clean = str
    clean.replace('"', "'")
    return clean
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest("hex");
    return {
        salt:salt,
        passwordHash:value
    };
}

function saltHashPassword(userpassword) {
    const salt = genRandomString(16); /** Gives us salt of length 16 */
    return sha512(userpassword, salt);
}

function verifySaltHashPassword(userpassword, salt) {
    return sha512(userpassword, salt).passwordHash;
}

module.exports = {
    saltHashPassword,
    verifySaltHashPassword
};