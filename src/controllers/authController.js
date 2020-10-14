"use strict";
const config = require('config');
const AuthenticationError = require('../errors/AuthenticationError');
const User = require('../models/User');
const {login} = require('../services/authServices');

function userLogin(req, res) {
    const {username, password} = req.body;
    return login(username, password).then(id, token => {
        res.cookie("token", token, {
            maxAge: moment.duration(...config.get("expTime")), SameSite: "Strict"
        })
        console.log(`Usuario username:${user.username}`)
        return res.status(200).send({id})
    }).catch(e => {
        if (e instanceof AuthenticationError) {
            console.log(
                `Intento de login con ${e.field} incorrecto`+
                `{usuario: ${username}, password: ${password}}`
                )
            return res.status(401).send({message: config.auth.errorLogin});
        } else {
            return res.status(500).send(e.message);
        }
    });
}

function userModify(req, res) {
    const {username, password} = req.body;
    modifyUser(username, password).then (
        () => {
            return res.status(200).send({})
        },
        e => {
            console.error(e.stack);
            return res.status(500).send({message: "Error al modificar usuario"})
        }
    )
}

module.exports = {userLogin, userModify}