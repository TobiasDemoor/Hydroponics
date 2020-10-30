"use strict";
const config = require('config');
const fs = require('fs');
const User = require('../models/User');


/**
 * Persiste el usuario en disco en la ruta routeUser
 * @param {User} user 
 */
async function saveUser(user) {
    return new Promise((resolve, reject) => {
        console.log("Guardando usuario");
        let data;
        try {
            data = JSON.stringify(user);
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("El objeto user esta mal formado")
                throw err
            }
        }
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
async function getUser() {
    return new Promise((resolve, reject) => {
        console.log("Cargando usuario");
        fs.readFile(config.auth.routeUser, 'utf8', (err, data) => {
            if (err || !data) {
                reject(err || data)
            }
            if (data) {
                try {
                    resolve(JSON.parse(data.toString()))
                } catch (err) {
                    if (err instanceof SyntaxError) {
                        console.error("La cadena guardada en el archivo de usuarios no es JSON válido")
                        console.error(`data: ${data.toString()}`)
                        throw err
                    }
                }
            }
        });
    })
    
}

module.exports = {saveUser, getUser};