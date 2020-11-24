"use strict";
const { invalidId } = require('config').get('strings');
const controlActuator = require("../messages/actuatorControl");
const { getUltimo } = require("../data/dataRepository");
const IdError = require("../errors/IdError");

async function changeActuators(req, res) {
    const { id, idActuator, state } = req.body;
    controlActuator(id, idActuator, state)
        .then(() => getUltimo(id))
        .then(row => res.status(200).send({ row }))
        .catch(err => {
            if (err instanceof IdError) {
                res.status(400).send({ message: invalidId, id: err.id })
            } else {
                console.error(err);
                res.status(500).send(err);
            }
        })
}

module.exports = {
    changeActuators
}