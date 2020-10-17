"use strict";
const { exec } = require('child_process');
const config = require('config');

// recent("prueba.log", 20).then(console.log)

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

/**
 * Retorna las nro lineas mas recientes del archivo solicitado
 * @param {string} archivo
 * @param {number} nro 
 */
async function recent(archivo, nro) {
    const data = levantaRecientes(archivo, nro)
    const res = {}
    res.columns = config.data.columns;
    res.rows = [];
    res.rows = await data.then(data => {
        return data.map(l => {
            const row = {code: l.join('')};
            l.map((valor, i) => {
                row[res.columns[i].id] = valor
            })
            return row
        })
    })
    return res
}

/**
 * Retorna las nro lineas mas recientes de los archivos
 * de config.data.archivos
 * @param {number} nro 
 */
async function recientesGeneral(nro) {
    const data = config.data.archivos.map(
        archivo => levantaRecientes(archivo, nro)
    )
    const res = {}
    res.columns = config.data.columns;
    res.rows = [];
    for (let i = 0; i < data.length; i += 1) {
        res.rows[i] = await data[i].then(data => {
            return data.map(l => {
                const row = {};
                l.map((valor, i) => {
                    row[res.columns[i].id] = valor
                })
                return row
            })
        })
    }
    return res
}

module.exports = {
    recientesGeneral,
    recent
}
