const request = require('supertest');
const { saveUser } = require('../../auth/userRepository');
const User = require('../../models/User');
const authAux = require('../authAux');
const { successChangeLogin, badLogin, noCookieInRequest } = require('config').get("strings");


const currentUsername = "sadfasdfa";
const currentPassword = "asdfauierf";
const newUsername = "uiorpoqiwupioqewr";
const newPassword = "reiowpqf;asdj";

let server, app, token;

beforeAll(async () => {
    const res = await authAux(3001, currentUsername, currentPassword);
    server = res.server;
    app = res.app;
    token = res.token;
})

afterAll(async () => { await server.close(); });

beforeEach(async () => {
    await saveUser(new User(currentUsername, currentPassword))
})


test('modify con usuario y contraseña correctos y usuario y contraseña nuevos válidos',
    async () => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername, currentPassword, newUsername, newPassword })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(successChangeLogin);
    }
)

test('modify con usuario incorrecto y contraseña correcta y usuario y contr nuevos validos',
    async () => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername: currentUsername + '4', currentPassword, newUsername, newPassword })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(badLogin);
    }
)

test('modify con usuario correcto y contraseña incorrecta y usuario y contr nuevos validos',
    async () => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername, currentPassword: currentPassword + '4', newUsername, newPassword })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(badLogin);
    }
)

test('modify sin token el resto correcto', async () => {
    const res = await request(app).post('/api/auth/modify')
        .send({ currentUsername, currentPassword, newUsername, newPassword });
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(noCookieInRequest);
})
