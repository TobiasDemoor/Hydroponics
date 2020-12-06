"use strict";
const config = require('config');
const moment = require('moment');
const AuthenticationError = require('../errors/AuthenticationError');
const { login, modifyUser } = require('../auth/authServices');

const {
    badLogin, successChangeLogin, parameterMissing
} = config.get('strings')

async function userLogin(req, res, next) {
    const { username, password } = req.body;

    if (typeof username === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'username' }
        )
    } else if (typeof password === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'password' }
        )
    } else {
        login(username, password).then(({ user, token }) => {
            res.cookie("token", token, {
                maxAge: moment.duration(...config.get('jwt').expTime), SameSite: "Strict"
            })
            console.log(`Login username:${user.username}`);
            res.status(200).send({ id: user.id, token })
        }).catch(err => {
            if (err instanceof AuthenticationError) {
                console.log(
                    `Login attempt with  wrong ${err.field} username: ${username}`
                )
                res.status(401).send({ message: badLogin });
            } else {
                next(err);
            }
        });
    }
}

async function userModify(req, res, next) {
    const { currentUsername, currentPassword, newUsername, newPassword } = req.body;
    if (typeof currentUsername === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'currentUsername' }
        )
    } else if (typeof currentPassword === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'currentPassword' }
        )
    } else if (typeof newUsername === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'newUsername' }
        )
    } else if (typeof newPassword === 'undefined') {
        res.status(400).send(
            { message: parameterMissing, param: 'newPassword' }
        )
    } else {
        login(currentUsername, currentPassword)
            .then(() => modifyUser(newUsername, newPassword))
            .then(() => res.status(200).send({ message: successChangeLogin }))
            .catch(err => {
                if (err instanceof AuthenticationError) {
                    res.status(400).send({ message: badLogin })
                } else {
                    next(err);
                }
            })
    }
}

module.exports = { userLogin, userModify }