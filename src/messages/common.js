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

async function control(data, name) {
    const file = path.join(config.comunication.path, `request.${name}`)
    fs.writeFile(file, data, err => {
        if (err) throw err
    })
    return comunication(name, 2000)
        .catch(err => {
            fs.unlink(file, () => {})
            throw err;
        })
}

module.exports = {
    comunication,
    control
}
