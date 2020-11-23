"use strict";
const { getUser, saveUser } = require('./userRepository');
const AuthenticationError = require('../errors/AuthenticationError');
const User = require('./User');
const { login, modifyUser } = require('./authServices');
const { verifySaltHashPassword } = require('./hashServices');


describe('verifica logins', () => {
    let user;
    const username = "fasdfas";
    const password = "gewaksdf";
    beforeAll(async () => {
        user = new User(username, password);;
        return saveUser(user);
    });

    test('se verifica el login', async () => {
        return login(username, password)
            .then(data => expect(data.user).toEqual(user));
    })

    test('se deniega el login por usuario incorrecto', async () => {
        return expect(login("no", password)).rejects.toEqual(new AuthenticationError("username"));
    })

    test('se deniega el login por constraseña incorrecta', async () => {
        return expect(login(username, "")).rejects.toEqual(new AuthenticationError("password"));
    })
})


it('checks modifyUser con usuario y contraseña validos', async done => {
    const username = "asfwheja";
    const password = "evbfvbru";
    const user = await modifyUser(username, password)
        .then(() => getUser());
    console.debug(`User = ${user.username}`)
    expect(user.username).toEqual(username);
    expect(user.password).toEqual(verifySaltHashPassword(password, user.salt));
    done();
})

// it('checks modifyUser con usuario invalido', async () => {

// })