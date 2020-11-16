"use strict";
const { exec } = require('child_process');
const fs = require('fs');
const config = require('config');
const { log, columns, sections, separador } = config.data;

function getLogRoute(id) {
    return sections[id].log || log(sections[id].id || id);
}

function getColumnsRoute(id) {
    return sections[id].columns || columns(sections[id].id || id);
}

// recent("prueba.log", 20).then(console.log)

async function tailN(archivo, nro) {
    return new Promise(resolve => {
        exec(`tail -${nro} ${archivo} | tac`, (err, stdout, stderr) => {
            if (err) { throw err; }
            else if (stderr) { throw stderr; }
            else {
                const data = stdout.trim().split('\n');
                for (let i = 0; i < data.length; i += 1) {
                    data[i] = data[i].trim().split(separador)
                }
                resolve(data);
            }
        })
    })
}

async function levantaRecientes(id, nro) {
    const archivo = getLogRoute(id)
    const data = await tailN(archivo, nro);
    if (data.length < nro) {
        data.push(...await tailN(archivo + '.0', nro - data.length))
    }
    return data
}

async function levantaColumns(id) {
    const archivo = getColumnsRoute(id)
    return new Promise((resolve, reject) => {
        fs.readFile(archivo, 'utf8', (err, data) => {
            if (err || !data) {
                reject(err || data)
            }
            if (data) {
                try {
                    resolve(JSON.parse(data.toString()))
                } catch (err) {
                    if (err instanceof SyntaxError) {
                        console.error(`The string stored in ${archivo} is not valid JSON`)
                        console.error(`data: ${data.toString()}`)
                        throw err
                    }
                }
            }
        });
    })
}

/**
 * Retorna las nro lineas mas recientes del archivo solicitado
 * @param {string} archivo
 * @param {number} nro 
 */
async function recent(id, nro) {
    const data = levantaRecientes(id, nro)
    const res = {}
    res.columns = await levantaColumns(id);
    res.rows = [];
    res.rows = await data.then(data => {
        return data.map(l => {
            const row = {};
            l.map((valor, i) => {
                row[res.columns[i].id] = valor
            })
            return row
        })
    })
    return res
}

async function getUltimo(id) {
    return recent(id, 1).then(res => res.rows[0])
}

async function getUltimos() {
    const data = {}
    for (let entry of Object.entries(sections)) {
        const id = entry[0];
        data[id] = recent(id, 1).then(res => (
            {
                columns: res.columns,
                row: res.rows[0],
                title: sections[id].title,
            }
        ))
    }
    for (let entry of Object.entries(data)) {
        data[entry[0]] = await entry[1]
    }
    return data
}


async function cambiarColumnas(id, columns) {
    return new Promise((resolve, reject) => {
        console.log(`Storing column with id = ${id}`);
        let data;
        try {
            data = JSON.stringify(columns);
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("Column object is badly formed")
            }
            reject(err)
        }
        const route = getColumnsRoute(id)
        fs.writeFile(route, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

module.exports = {
    recent,
    getUltimo,
    getUltimos,
    cambiarColumnas,
}
