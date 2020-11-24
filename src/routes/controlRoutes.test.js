const request = require('supertest');
const config = require('config');
const User = require('../auth/User');
const { noCookieInRequest, invalidId } = config.get("strings");
const { createToken } = require('../auth/tokenServices');

const app = require('../server');

const username = "sadfasdfa";
const password = "asdfauierf";

const { sections, cantRecientes, actuators: { on, off } } = config.get("data");
let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element)
let token;

beforeAll(() => {
    token = createToken(new User(username, password));
})

describe('test actuator route', () => {
    // test.only('nada', () => expect(null).toBeNull())
    test('actuator id valido', async done => {
        const res = await request(app).post('/api/control/actuator')
            .send({ id: "ambient", idActuator: "pump1", state: on })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(200);
        expect(res.body.row).not.toBeUndefined();
        done();
    })

    test('actuator id sección invalido', async done => {
        const id = "invalido";
        const res = await request(app).post('/api/control/actuator')
            .send({ id, idActuator: "pump1", state: on })
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(invalidId);
        expect(res.body.id).toBe(id)
        done();
    } )
})