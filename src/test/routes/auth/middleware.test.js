const request = require('supertest');
const config = require('config');
const User = require('../../../models/User');
const { createToken } = require('../../../auth/tokenServices');
const { noCookieInRequest, invalidToken } = config.strings

const app = require('../../../server');

const username = "sadfasdfa";
const password = "asdfauierf";
let token, user;

beforeAll(async () => {
    user = new User(username, password);
    token = createToken(user);
})

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