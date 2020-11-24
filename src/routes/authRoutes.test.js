const request = require('supertest');
const User = require("../auth/User");
const { saveUser } = require("../auth/userRepository");

const app = require('../server')

const username = "sadfasdfa";
const password = "asdfauierf";
let user;

beforeAll(() => {
    user = new User(username, password);
})

describe('test login route', () => {
    const config = require("config");
    const fs = require('fs');
    const { badLogin } = config.get("strings");

    beforeAll(async () => saveUser(user));

    test('login con usuario y contraseña correctos', async done => {
        const res = await request(app).post('/api/auth/login')
            .send({ username, password });
        expect(res.status).toBe(200);
        expect(res.body.token).not.toBe(undefined);
        done();
    })

    test('login con usuario incorrecto y contraseña correcta', async done => {
        const res = await request(app).post('/api/auth/login')
            .send({ username: username + ' ', password });
        expect(res.status).toBe(401);
        expect(res.body.token).toBe(undefined);
        expect(res.body.message).toBe(badLogin);
        done();
    })

    test('login con usuario correcto y contraseña incorrecta', async done => {
        const res = await request(app).post('/api/auth/login')
            .send({ username, password: password + ' ' });
        expect(res.status).toBe(401);
        expect(res.body.token).toBe(undefined);
        expect(res.body.message).toBe(badLogin);
        done();
    })

    test('login con usuario y contraseña undefined', async done => {
        const res = await request(app).post('/api/auth/login')
            .send({});
        expect(res.status).toBe(401);
        expect(res.body.token).toBe(undefined);
        done();
    })

    test('login con usuario y contraseña vacios', async done => {
        const res = await request(app).post('/api/auth/login')
            .send({ username: '', password: '' });
        expect(res.status).toBe(401);
        expect(res.body.token).toBe(undefined);
        done();
    })

    test('login sin usuario guardado', async done => {
        const auth = config.get("auth");
        fs.unlinkSync(auth.routeUser);
        const res = await request(app).post('/api/auth/login')
            .send({ username: auth.default, password: auth.default });
        expect(res.status).toBe(200);
        expect(res.body.token).not.toBe(undefined);
        done();
    })

})

describe('tests de ruta de modify', () => {
    const { successChangeLogin, badLogin, noCookieInRequest } = require('config').get("strings");
    const { createToken } = require('../auth/tokenServices');

    const newUsername = "uiorpoqiwupioqewr";
    const newPassword = "reiowpqf;asdj";
    let token;

    beforeAll(() => {
        token = createToken(user);
    })

    beforeEach(async () => saveUser(user))

    test('modify con usuario y contraseña correctos y usuario y contraseña nuevos válidos',
        async done => {
            const res = await request(app).post('/api/auth/modify')
                .send({ currentUsername: username, currentPassword: password, newUsername, newPassword })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body.message).toBe(successChangeLogin);
            done();
        }
    )

    test('modify con usuario incorrecto y contraseña correcta y usuario y contr nuevos validos',
        async () => {
            const res = await request(app).post('/api/auth/modify')
                .send({ currentUsername: username + '4', currentPassword: password, newUsername, newPassword })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(badLogin);
        }
    )

    test('modify con usuario correcto y contraseña incorrecta y usuario y contr nuevos validos',
        async done => {
            const res = await request(app).post('/api/auth/modify')
                .send({ currentUsername: username, currentPassword: password + '4', newUsername, newPassword })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(badLogin);
            done();
        }
    )

    test('modify sin token el resto correcto', async done => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername: username, currentPassword: password, newUsername, newPassword });
        expect(res.status).toBe(403);
        expect(res.body.message).toBe(noCookieInRequest);
        done();
    })

})
