'use strict';
const comunication = require('./common.js')
const fs = require('fs')
const config = require('config')
const path = require('path')

async function controlActuator(id, state) {
    const data = JSON.stringify({ id, state })
    fs.writeFile(
        path.join(config.comunication.path, "request.actuator"), data, err => {
            if (err) throw err
        }
    )

    return comunication("actuator", 2000)
}

module.exports = controlActuator