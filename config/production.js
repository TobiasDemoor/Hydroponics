"use strict";
const path = require('path')

module.exports = {
    express: {
        "port": process.env.PORT || 5000,
        "client": path.resolve("client"),
    },
}