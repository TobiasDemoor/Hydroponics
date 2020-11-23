const express = require('express');
const cookieParser = require('cookie-parser');
const request = require('supertest');
const config = require('config');
const User = require('../auth/User');
const { createToken } = require('../auth/tokenServices');
const { noCookieInRequest, invalidToken } = config.strings
const authMiddleware = require('./authMiddleware');

const username = "sadfasdfa";
const password = "asdfauierf";
let app, token, user;

async function testController(req, res) {
    res.status(200).send({ user: req.user });
}

beforeAll(async () => {
    app = express();
    app.use(cookieParser());
    app.get("/test", authMiddleware, testController);
    user = new User(username, password);
    token = createToken(user);
})

test('get recent con token ok', async () => {
    const res = await request(app).get('/test')
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(200);
    expect(res.body.user).toBe(username)
})

test('get recent sin token', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(noCookieInRequest);
})

test('get recent con token expirado', async () => {
    const tokenExp = createToken(user, [0, 'm']);
    const res = await request(app).get('/test')
        .set("Cookie", [`token=${tokenExp}`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})

test('get recent con token invalido', async () => {
    const res = await request(app).get('/test')
        .set("Cookie", [`token=123`]);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe(invalidToken);
})