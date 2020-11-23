"use strict";
const config = require('config');
const moment = require('moment');
const AuthenticationError = require('../errors/AuthenticationError');
const { login, modifyUser } = require('../auth/authServices');

const strings = config.strings

async function userLogin(req, res) {
    const { username, password } = req.body;
    login(username, password).then(({ user, token }) => {
        res.cookie("token", token, {
            maxAge: moment.duration(...config.jwt.expTime), SameSite: "Strict"
        })
        console.log(`Login username:${user.username}`);
        res.status(200).send({ id: user.id, token })
    }).catch(err => {
        if (err instanceof AuthenticationError) {
            console.log(
                `Login attempt with  wrong ${err.field} username: ${username}`
            )
            res.status(401).send({ message: strings.badLogin });
        } else {
            console.error(err.stack);
            res.status(500).send({ message: strings.unkErrorLogin })
        }
    });
}

async function userModify(req, res) {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;
    login(currentUsername, currentPassword)
        .then(() => modifyUser(newUsername, newPassword))
        .then(() => res.status(200).send({message: strings.successChangeLogin}))
        .catch( err => {
            if (err instanceof AuthenticationError) {
                res.status(400).send({message: strings.badLogin})
            } else {
                console.error(err.stack);
                res.status(500).send({ message: strings.unkErrorChangeLogin })
            }
        })
}

module.exports = { userLogin, userModify }