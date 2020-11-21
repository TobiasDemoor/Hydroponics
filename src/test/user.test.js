"use strict";
const { saveUser } = require('../auth/userRepository');
const AuthenticationError = require('../errors/AuthenticationError');
const User = require('../models/User');
const { login } = require('../services/authServices');
let user;

beforeAll(
    async function () {
        user = new User("admin", "admin");
        await saveUser(user)
    }
)

afterAll(() => {
    const fs = require('fs');
    const config = require('config');
    fs.unlink(config.auth.routeUser, () => {});
})


test('se verifica el login',
    async function () {
        const data = await login("admin", "admin")
        expect(data.user).toEqual(user)
    }
)

test('se deniega el login',
    async function () {
        try {
            await login("admin", "admi")
            throw new Error("Login no deberia haber sido aceptado")
        } catch (err) {
            expect(err).toBeInstanceOf(AuthenticationError)
        }
    }
)
