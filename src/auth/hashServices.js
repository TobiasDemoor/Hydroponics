"use strict";
const crypto = require("crypto");

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString("hex") /** convert to hexadecimal format */
        .slice(0, length);   /** return required number of characters */
};

function cleanString(str) {
    const pieces = str.split('"');
    return pieces.join("'")
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    const saltClean = cleanString(salt);
    const hash = crypto.createHmac("sha512", saltClean); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = cleanString(hash.digest("hex"));
    return {
        salt: saltClean,
        passwordHash: value
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
    sha512,
    saltHashPassword,
    verifySaltHashPassword
};