const request = require('supertest');
const config = require('config');
const { recent } = require("../../../data/dataRepository");
const { sections, cantRecientes } = config.get("data");
const { noCookieInRequest, invalidId } = config.get("strings");
const { createToken } = require('../../../auth/tokenServices');
const User = require('../../../auth/User');

const app = require('../../../server')

const username = "sadfasdfa";
const password = "asdfauierf";
let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element)
let token;

beforeAll(() => {
    token = createToken(new User(username, password));
})

test('get recent todas las secciones', async () => {
    for (id of ids) {
        const res = await request(app).get(`/api/data/recent/${id}`)
            .set('Cookie', [`token=${token}`]);
        const data = await recent(id, cantRecientes)
        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(data);
    }
})

test('get recent todas las secciones sin token', async () => {
    for (id of ids) {
        const res = await request(app).get(`/api/data/recent/${id}`);
        expect(res.status).toBe(403);
        expect(res.body.message).toBe(noCookieInRequest);
    }
})

test('get recent con id incorrecto', async () => {
    const res = await request(app).get(`/api/data/recent/invalido`)
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(invalidId);
})
