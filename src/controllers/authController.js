"use strict";
const config = require('config');
const moment = require('moment');
const AuthenticationError = require('../errors/AuthenticationError');
const { login, modifyUser } = require('../services/authServices');

async function userLogin(req, res) {
    const { username, password } = req.body;
    login(username, password).then(({ user, token }) => {
        res.cookie("token", token, {
            maxAge: moment.duration(...config.jwt.expTime), SameSite: "Strict"
        })
        console.log(`Usuario username:${user.username}`);
        res.status(200).send({ id: user.id })
    }).catch(err => {
        if (err instanceof AuthenticationError) {
            console.log(
                `Intento de login con ${err.field} incorrecto` +
                `{usuario: ${username}, password: ${password}}`
            )
            res.status(401).send({ message: "Usuario o contraseña incorrectos" });
        } else {
            console.error(err.stack);
            res.status(500).send({ message: "Error desconocido al loguearse" })
        }
    });
}

async function userModify(req, res) {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;
    login(currentUsername, currentPassword)
        .then(() => modifyUser(newUsername, newPassword))
        .then(
            () => res.status(200).send({message: "Usuario modificado correctamente"}),
            err => {
                console.error(err.stack);
                res.status(500).send({ message: "Error al modificar usuario" })
            }
        )
}

module.exports = { userLogin, userModify }