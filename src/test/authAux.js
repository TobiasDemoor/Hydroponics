const request = require('supertest');
const { startServer } = require("../start");
const User = require("../models/User");
const { createToken } = require('../auth/tokenServices');

async function authAux(port = 3001, username = "a;klasfsd", password = "asdfaf") {
    const { server, app } = await startServer(port);
    const token = createToken(new User(username, password));
    return { server, app, token }
}

module.exports = authAux;