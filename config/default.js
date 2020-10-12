/* eslint-disable no-undef */
"use strict";
const path = require("path");

module.exports = {
    "port": process.env.PORT || 5000,
    "client": path.join(__dirname, "client/build"),
    "TOKEN_SECRET": process.env.TOKEN_SECRET || "tokensecreto",
    "expTime": [1, 'd']
}