'use strict';
const fs = require('fs');
const path = require('path');
const config = require('config');
const TimeoutError = require('../errors/TimeoutError');
const comms = config.get('comunication');

/**
 * 
 * @param {string} name nombre que indica el tipo de comando
 * @param {number} timeout tiempo máximo de espera
 * @returns {Promise<void>}
 */
async function comunication(name, timeout) {
    return new Promise(function (resolve, reject) {
        const dir = comms.path

        const watcher = fs.watch(dir, function (eventType, filename) {
            const split = filename.split('.')

            if (eventType === "change" && split[1] === name && split[0] !== "request") {
                clearTimeout(timer);
                watcher.close();
                const file = path.join(dir, filename)
                if (split[0] === "error") {
                    const msg = fs.readFileSync(file, 'utf8')
                    console.log(`Control program returned error: ${msg}`)
                    fs.unlink(file, () => { })
                    reject(new Error(msg));
                } else {
                    fs.unlink(file, () => { })
                    resolve();
                }
            }
        });

        const timer = setTimeout(function () {
            watcher.close();
            reject(new TimeoutError());
        }, timeout);
    });

}

/**
 * 
 * @param {string} data información a escribir en el archivo de comunicación
 * @param {string} name nombre que indica el tipo de comando
 * @returns {Promise<void>}
 */
async function control(data, name) {
    const file = path.join(comms.path, `request.${name}`)
    fs.writeFile(file, data, err => {
        if (err) throw err
    })
    return comunication(name, comms.timeout)
        .catch(err => {
            if (err instanceof TimeoutError){
                fs.unlink(file, () => { })
            }
            throw err;
        })
}

module.exports = {
    comunication,
    control
}
