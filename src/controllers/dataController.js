"use strict";
const config = require("config");
const { recent, cambiarColumnas, getUltimos } = require("../data/dataRepository");
const updateMedidas = require("../messages/updateMedidas");

async function getRecent(req, res) {
    recent(req.params.id, config.data.cantRecientes)
        .then( data => res.status(200).send(data))
        .catch(err => {
            console.error(err);
            res.status(500).send(err)
        });
}

async function changeColumns(req, res) {
    const { columns, id } = req.body;
    cambiarColumnas(id, columns)
        .then(() => {
            res.status(200).send({ id })
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err)
        });
}

async function update(req, res) {
    updateMedidas()
        .then(getUltimos)
        .then( data => res.status(200).send(data))
        .catch(err => {
            console.error(err);
            res.status(500).send(err)
        });
}

module.exports = {
    getRecent,
    changeColumns,
    update
}