"use strict";
const config = require("config");
const { recent, cambiarColumnas } = require("../data/dataRepository");

async function getRecent(req, res) {
    recent(req.params.id, config.data.cantRecientes)
        .then(data => {
            res.status(200).send(data)
        }).catch(console.error)
}

async function changeColumns(req, res) {
    const { columns, id } = req.body;
    cambiarColumnas(id, columns)
        .then(() => {
            res.status(200).send({ id })
        })
}

module.exports = {
    getRecent,
    changeColumns
}