const request = require('supertest');
const config = require("config");
const fs = require('fs');
const { startServer } = require("../../../start");
const User = require("../../../models/User");
const { saveUser } = require("../../../auth/userRepository");
const { badLogin } = config.get("strings");

const username = "sadfasdfa";
const password = "asdfauierf";

let server, app;

beforeAll(async () => {
    const res = await startServer(3001);
    await saveUser(new User(username, password))
    server = res.server
    app = res.app
})

afterAll(async () => { await server.close(); });

it('login con usuario y contraseña correctos', async () => {
    const res = await request(app).post('/api/auth/login')
        .send({ username, password });
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(undefined);
})

it('login con usuario incorrecto y contraseña correcta', async () => {
    const res = await request(app).post('/api/auth/login')
        .send({ username: username + ' ', password });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    expect(res.body.message).toBe(badLogin);
})

it('login con usuario correcto y contraseña incorrecta', async () => {
    const res = await request(app).post('/api/auth/login')
        .send({ username, password: password + ' ' });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
    expect(res.body.message).toBe(badLogin);
})

it('login con usuario y contraseña undefined', async () => {
    const res = await request(app).post('/api/auth/login')
        .send({});
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
})

it('login con usuario y contraseña vacios', async () => {
    const res = await request(app).post('/api/auth/login')
        .send({ username: '', password: '' });
    expect(res.status).toBe(401);
    expect(res.body.token).toBe(undefined);
})

it('login sin usuario guardado', async () => {
    const auth = config.get("auth");
    fs.unlinkSync(auth.routeUser);
    const res = await request(app).post('/api/auth/login')
        .send({ username: auth.default, password: auth.default });
    expect(res.status).toBe(200);
    expect(res.body.token).not.toBe(undefined);
})
