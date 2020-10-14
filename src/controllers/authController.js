"use strict";
const config = require('config');
const AuthenticationError = require('../errors/AuthenticationError');
const {login} = require('../services/authServices');

async function userLogin(req, res) {
    const {username, password} = req.body;
    login(username, password).then(id, token => {
        res.cookie("token", token, {
            maxAge: moment.duration(...config.get("expTime")), SameSite: "Strict"
        })
        console.log(`Usuario username:${user.username}`)
        res.status(200).send({id})
    }).catch(err => {
        if (err instanceof AuthenticationError) {
            console.log(
                `Intento de login con ${err.field} incorrecto`+
                `{usuario: ${username}, password: ${password}}`
                )
            res.status(401).send({message: "Usuario o contraseña incorrectos"});
        } else {
            console.error(err.stack);
            res.status(500).send({message: "Error desconocido al loguearse"})
        }
    });
}

async function userModify(req, res) {
    const {username, password} = req.body;
    modifyUser(username, password).then (
        () => {
            res.status(200).send({})
        },
        err => {
            console.error(err.stack);
            res.status(500).send({message: "Error al modificar usuario"})
        }
    )
}

module.exports = {userLogin, userModify}