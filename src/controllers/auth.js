"use strict";
const tokenServices = require('../services/tokenServices');

module.exports.userLogin = function(req, res) {
    // TODO: verifico usuario
    const user = {id: 1};
    return res.status(200).send({token: tokenServices.createToken(user)})
}