"use strict";
const { invalidId, parameterMissing } = require('config').get('strings');
const controlActuator = require("../messages/actuatorControl");
const updateMedidas = require("../messages/updateMedidas");
const { getUltimo, getUltimos } = require("../data/dataRepository");
const IdError = require("../errors/IdError");

async function changeActuators(req, res, next) {
    const { id, idActuator, state } = req.body;

    if (typeof id === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'id' }
        )
    } else if (typeof idActuator === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'idActuator' }
        )
    } else if (typeof state === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'state' }
        )
    } else {
        controlActuator(id, idActuator, state)
            .then(() => getUltimo(id))
            .then(row => res.status(200).send({ row }))
            .catch(err => {
                if (err instanceof IdError) {
                    res.status(400).send({ message: invalidId, id: err.id })
                } else {
                    next(err);
                }
            })
    }
}

async function update(req, res, next) {
    updateMedidas()
        .then(getUltimos)
        .then(data => res.status(200).send({ sections: data }))
        .catch(err => { next(err); });
}

module.exports = {
    changeActuators,
    update
}