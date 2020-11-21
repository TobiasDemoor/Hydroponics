const request = require('supertest');
const config = require('config');
const { startServer } = require("../../start");
const User = require('../../models/User');
const { createToken } = require('../../auth/tokenServices');
const { noCookieInRequest, invalidToken } = config.strings

const username = "sadfasdfa";
const password = "asdfauierf";
let server, app, token, user;

beforeAll(async () => {
    let res = await startServer(3001);
    server = res.server;
    app = res.app;
    user = new User(username, password);
    token = createToken(user);
})

afterAll(() => { server.close() })

test('get recent con token ok', async () => {
    const res = await request(app).get('/api/data/recent/ambient')
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(200);
})

test('get recent sin token', async () => {
    const res = await request(app).get('/api/data/recent/ambient');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(noCookieInRequest);
})

test('get recent con token expirado', async () => {
    const tokenExp = createToken(user, [0, 'm']);
    const res = await request(app).get('/api/data/recent/ambient')
        .set("Cookie", [`token=${tokenExp}`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})

test('get recent con token invalido', async () => {
    const res = await request(app).get('/api/data/recent/ambient')
        .set("Cookie", [`token=123`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})