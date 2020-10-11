"use strict";

const User = require('../models/user');
const hashServices = require('../services/hashServices');


test('se verifica el password', () => {
    const user = new User("test", "test");
    const hash = hashServices.verifySaltHashPassword("test", user.salt);
    expect(hash).toBe(user.password);
})