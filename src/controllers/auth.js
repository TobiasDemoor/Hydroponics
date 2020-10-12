"use strict";
const moment = require('moment');
const config = require('config');
const tokenServices = require('../services/tokenServices');

module.exports.userLogin = function(req, res) {
    // TODO: verifico usuario
    const user = {id: 1};
    const token = tokenServices.createToken(user)
    res.cookie("token", token, {
        maxAge: moment.duration(...config.get("expTime")), SameSite: "Strict"
    })
    console.log(`Usuario username:${user.username}`)
    return res.status(200).send({})
}