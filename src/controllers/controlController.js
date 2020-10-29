"use strict";
const controlActuator = require("../control/actuatorControl");
const { getUltimo } = require("../data/dataRepository");

async function changeActuators(req, res) {
    const { id, idActuator, state } = req.body;
    controlActuator(idActuator, state)
        .then(() => getUltimo(id))
        .then(row => res.status(200).send({ row }))
        .catch(err => {
            console.error(err)
            res.status(500).send(err)
        })
}

module.exports = {
    changeActuators
}