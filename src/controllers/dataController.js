"use strict";

const { recientesGeneral } = require("../data/dataRepository");

async function getRecent(req, res) {
    recientesGeneral(30)
        .then(data => {
            res.status(200).send(data)
        }).catch(console.error)
}

module.exports = {
    getRecent
}