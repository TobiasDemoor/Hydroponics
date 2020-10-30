'use strict';
const { control } = require('./common.js')

async function actuatorControl(id, state) {
    const data = JSON.stringify({ id, state })
    
    return control(data, "actuator");
}

module.exports = actuatorControl