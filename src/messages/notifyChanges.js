"use-strict";
const fs = require('fs');
const path = require('path');
const config = require('config');
const comms = config.get('comunication');

function notifyChanges() {
    const file = path.join(comms.path, `request.changes`)
    fs.writeFile(file, '', err => {
        if (err) console.error(err);
    })
}

module.exports = notifyChanges;