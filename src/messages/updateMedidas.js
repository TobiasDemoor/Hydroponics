'use strict';
const { control } = require('./common.js')

async function updateMedidas() {    
    return control("", "update");
}

module.exports = updateMedidas