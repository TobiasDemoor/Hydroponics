"use strict";
const config = require("config");
const { recent } = require("../data/dataRepository");

async function getRecent(req, res) {
    recent(config.data.archivos[req.params.id], config.data.cantRecientes)
        .then(data => {
            res.status(200).send(data)
        }).catch(console.error)
}

module.exports = {
    getRecent
}