"use strict";
const config = require("config");
const { recent, cambiarColumnas } = require("../data/dataRepository");
const IdError = require("../errors/IdError");
const { invalidId, parameterMissing } = config.get("strings")
const { cantRecientes } = config.get('data');

async function getRecent(req, res, next) {
    const { id } = req.params;
    recent(id, cantRecientes)
        .then(data => res.status(200).send(data))
        .catch(err => {
            if (err instanceof IdError) {
                res.status(400).send({ message: invalidId, id: err.id })
            } else {
                next(err);
            }
        });
}

async function changeColumns(req, res, next) {
    const { columns, id } = req.body;
    if (typeof id === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'id' }
        )
    } else if (typeof columns === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'columns' }
        )
    } else {
        cambiarColumnas(id, columns)
            .then(() => {
                res.status(200).send({ id })
            })
            .catch(err => {
                if (err instanceof IdError) {
                    res.status(400).send({ message: invalidId, id: err.id })
                } else {
                    next(err);
                }
            });
    }
}


module.exports = {
    getRecent,
    changeColumns
}