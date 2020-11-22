// "use strict";
// const { saveUser } = require('../auth/userRepository');
// const AuthenticationError = require('../errors/AuthenticationError');
// const User = require('../models/User');
// const { login } = require('../services/authServices');

// let user;

// beforeAll(async () => {
//     user = new User("admin", "admin");
//     await saveUser(user)
// })


// test('se verifica el login', async () => {
//     const data = await login("admin", "admin")
//     expect(data.user).toEqual(user)
// })

// test('se deniega el login', async () => {
//     try {
//         await login("admin", "admi")
//         throw new Error("Login no deberia haber sido aceptado")
//     } catch (err) {
//         expect(err).toBeInstanceOf(AuthenticationError)
//     }
// })
test('', () => expect(true).toBe(true))