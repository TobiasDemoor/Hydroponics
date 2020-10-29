'use strict';
const fs = require('fs');
const path = require('path')
const config = require('config');

async function comunication(name, timeout) {
    return new Promise(function (resolve, reject) {
        const dir = config.comunication.path

        const watcher = fs.watch(dir, function (eventType, filename) {
            const split = filename.split('.')

            if (eventType === "change" && split[1] === name && split[0] !== "request") {
                clearTimeout(timer);
                watcher.close();
                const file = path.join(dir, filename)
                if (split[0] === "error") {
                    const msg = fs.readFileSync(file, 'utf8')
                    console.log(msg)
                    fs.unlink(file, () => { })
                    reject(msg)
                } else {
                    fs.unlink(file, () => { })
                    resolve();
                }
            }
        });

        const timer = setTimeout(function () {
            watcher.close();
            reject(new Error('No response from control program'));
        }, timeout);
    });

}

module.exports = comunication
