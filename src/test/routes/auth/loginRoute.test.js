const request = require('supertest');
const config = require("config");
const fs = require('fs');
const User = require("../../../models/User");
const { saveUser } = require("../../../auth/userRepository");
const { badLogin } = config.get("strings");

const app = require('../../../server')

const username = "sadfasdfa";
const password = "asdfauierf";

beforeAll(async () => {
    return saveUser(new User(username, password))
})

it('login con usuario y contraseña correctos', async done => {
    const res = await request(app).post('/api/auth/login')
        .send({ username, password });
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(undefined);
    done();
})

it('login con usuario incorrecto y contraseña correcta', async done => {
    const res = await request(app).post('/api/auth/login')
        .send({ username: username + ' ', password });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    expect(res.body.message).toBe(badLogin);
    done();
})

it('login con usuario correcto y contraseña incorrecta', async done => {
    const res = await request(app).post('/api/auth/login')
        .send({ username, password: password + ' ' });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    expect(res.body.message).toBe(badLogin);
    done();
})

it('login con usuario y contraseña undefined', async done => {
    const res = await request(app).post('/api/auth/login')
        .send({});
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    done();
})

it('login con usuario y contraseña vacios', async done => {
    const res = await request(app).post('/api/auth/login')
        .send({ username: '', password: '' });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    done();
})

it('login sin usuario guardado', async done => {
    const auth = config.get("auth");
    fs.unlinkSync(auth.routeUser);
    const res = await request(app).post('/api/auth/login')
        .send({ username: auth.default, password: auth.default });
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(undefined);
    done();
})
