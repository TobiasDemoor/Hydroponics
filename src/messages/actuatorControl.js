'use strict';
const { levantaColumns, isIdValido } = require('../data/dataRepository.js');
const IdError = require('../errors/IdError.js');
const { control } = require('./common.js')
const { actuator } = require('config').get('data').types;


/**
 * @param {string} id identificador de la sección a la que pertenece el actuator
 * @param {string} idActuator identificador del actuator enviado
 * @param {object} state estado deseado para el actuator
 * @returns {Promise<void>}
 * @throws {IdError} si el identificador no es valido
 */
async function actuatorControl(id, idActuator, state) {
    if (id != "general") {
        if (!isIdValido(id)) throw new IdError(id);
        const exists = await levantaColumns(id).then(columns =>
            columns.find(({ id, type }) => id === idActuator && type === actuator)
        )
        if (!exists) throw new IdError(idActuator);
    }
    const data = JSON.stringify({ id: idActuator, state })

    return control(data, "actuator");
}

module.exports = actuatorControl