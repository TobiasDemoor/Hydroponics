"use strict";
const { exec } = require('child_process');
const fs = require('fs');
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

async function levantaRecientes(id, nro) {
    const archivo = config.data.archivos[id]
    const data = await tailN(archivo, nro);
    if (data.length < nro) {
        data.push(...await tailN(archivo + '.0', nro - data.length))
    }
    return data
}

async function levantaColumns(id) {
    const archivo = config.data.columns[id]
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
            const row = { code: l.join('') };
            l.map((valor, i) => {
                row[res.columns[i].id] = valor
            })
            return row
        })
    })
    return res
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
        const route = config.data.columns[id]
        fs.writeFile(route, data, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

async function getUltimo(id) {
    return recent(id, 1).then(res => res.rows[0])
}

module.exports = {
    recent,
    cambiarColumnas,
    getUltimo
}
