"use strict";
const config = require('config');
const fs = require('fs');
const User = require('../models/User');


/**
 * Persiste el usuario en disco en la ruta routeUser
 * @param {User} user 
 */
function saveUser(user) {
    return new Promise((resolve, reject) => {
        console.log("Guardando usuario");
        const data = [user.username, user.password, user.salt].join('\n');
        const route = config.auth.routeUser;
        fs.writeFile(route, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

/**
 * @returns {User} usuario recuperado
 */
function getUser() {
    return new Promise((resolve, reject) => {
        console.log("Cargando usuario");
        fs.readFile(config.auth.routeUser, 'utf8', (err, data) => {
            if (err || !data) {
                reject(err || data)
            }
            if (data) {
                resolve(new User(...data.split('\n')))
            }
        });
    })
    
}

module.exports = {saveUser, getUser};