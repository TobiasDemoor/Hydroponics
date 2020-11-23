const request = require('supertest');
const { saveUser } = require('../../../auth/userRepository');
const User = require('../../../auth/User');
const { successChangeLogin, badLogin, noCookieInRequest } = require('config').get("strings");
const { createToken } = require('../../../auth/tokenServices');

const app = require('../../../server');

const currentUsername = "sadfasdfa";
const currentPassword = "asdfauierf";
const newUsername = "uiorpoqiwupioqewr";
const newPassword = "reiowpqf;asdj";

let token, user;

beforeAll( () => {
    user = new User(currentUsername, currentPassword);
    token = createToken(user);
})

beforeEach(async () => saveUser(user))

test('modify con usuario y contraseña correctos y usuario y contraseña nuevos válidos',
    async done => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername, currentPassword, newUsername, newPassword })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe(successChangeLogin);
        done();
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
    async done => {
        const res = await request(app).post('/api/auth/modify')
            .send({ currentUsername, currentPassword: currentPassword + '4', newUsername, newPassword })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(badLogin);
        done();
    }
)

test('modify sin token el resto correcto', async done => {
    const res = await request(app).post('/api/auth/modify')
        .send({ currentUsername, currentPassword, newUsername, newPassword });
    expect(res.status).toBe(403);
    expect(res.body.message).toBe(noCookieInRequest);
    done();
})
