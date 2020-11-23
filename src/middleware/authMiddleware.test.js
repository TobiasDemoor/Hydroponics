const request = require('supertest');
const config = require('config');
const User = require('../models/User');
const { createToken } = require('../auth/tokenServices');
const { noCookieInRequest, invalidToken } = config.strings

const app = require('../server');
const authMiddleware = require('./authMiddleware');

const username = "sadfasdfa";
const password = "asdfauierf";
let token, user;

async function testController(req, res) {
    res.status(200).send({user: req.user});
}

beforeAll(async () => {
    app.get("/test/authMiddleware", authMiddleware, testController);
    user = new User(username, password);
    token = createToken(user);
})

test('get recent con token ok', async () => {
    const res = await request(app).get('/test/authMiddleware')
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(200);
    expect(res.body.user).toBe(username)
})

test('get recent sin token', async () => {
    const res = await request(app).get('/test/authMiddleware');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(noCookieInRequest);
})

test('get recent con token expirado', async () => {
    const tokenExp = createToken(user, [0, 'm']);
    const res = await request(app).get('/test/authMiddleware')
        .set("Cookie", [`token=${tokenExp}`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})

test('get recent con token invalido', async () => {
    const res = await request(app).get('/test/authMiddleware')
        .set("Cookie", [`token=123`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})