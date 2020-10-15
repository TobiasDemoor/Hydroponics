"use strict";
const { exec } = require('child_process');
const config = require('config');

// recientesGeneral().then(console.log)

async function tailN(archivo, nro) {
    return new Promise(resolve => {
        exec(`tail -${nro} ${archivo} | tac`, (err, stdout, stderr) => {
            if (err) { throw err; }
            else if (stderr) { throw stderr; }
            else {
                const data = stdout.trim().split('\n');
                for (let i = 0; i < data.length; i += 1) {
                    data[i] = data[i].trim().split(config.data.separador)
                }
                resolve(data);
            }
        })
    })
}

async function levantaRecientes(archivo, nro) {
    const data = await tailN(archivo, nro);
    if (data.length < nro) {
        data.push(...await tailN(archivo + '.0', nro - data.length))
    }
    return data
}

async function recientesGeneral(nro) {
    const data = config.data.archivos.map(
        archivo => levantaRecientes(archivo, nro)
    )
    for (let i = 0; i < data.length; i += 1) {
        data[i] = await data[i]
    }
    return data
}

module.exports = {
    recientesGeneral
}
