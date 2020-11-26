const { spawn } = require('child_process');
const request = require('supertest');
const config = require('config');
const User = require('../auth/User');
const { noCookieInRequest, invalidId, parameterMissing, timeoutErrorMsg } = config.get("strings");
const { createToken } = require('../auth/tokenServices');

const app = require('../server');

const username = "sadfasdfa";
const password = "asdfauierf";

const idValido = "ambient";
const idActuatorValido = "pump1"

const { actuators: { on, off } } = config.get("data");
let token;




describe('test actuator route', () => {
    describe('con app de control', () => {
        let child;
        beforeAll(() => {
            token = createToken(new User(username, password));
            child = spawn(
                './escucha.py',
                { cwd: config.get('comunication').path, detached: true }
            );
        })

        afterAll(() => {
            process.kill(-child.pid)
        })

        test('actuator id valido on', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: idActuatorValido, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body.row).not.toBeUndefined();
            done();
        })

        test('actuator id valido off', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: idActuatorValido, state: off })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body.row).not.toBeUndefined();
            done();
        })

        test('actuator id sección invalido', async done => {
            const id = "invalido";
            const res = await request(app).post('/api/control/actuator')
                .send({ id, idActuator: idActuatorValido, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(invalidId);
            expect(res.body.id).toBe(id)
            done();
        })

        test('actuator id actuator invalido', async done => {
            const id = "invalidoActuator";
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: id, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(invalidId);
            expect(res.body.id).toBe(id)
            done();
        })

        test('actuator id sección undefined', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ idActuator: idActuatorValido, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(parameterMissing);
            expect(res.body.param).toBe('id')
            done();
        })

        test('actuator id actuator undefined', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(parameterMissing);
            expect(res.body.param).toBe('idActuator')
            done();
        })

        test('actuator state undefined', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: idActuatorValido })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(parameterMissing);
            expect(res.body.param).toBe('state')
            done();
        })

        test('actuator sin cookie', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: idActuatorValido, state: on })
            expect(res.status).toBe(403);
            expect(res.body.message).toBe(noCookieInRequest);
            done();
        })
    })

    describe('sin app de control', () => {
        test('error', async done => {
            const res = await request(app).post('/api/control/actuator')
                .send({ id: idValido, idActuator: idActuatorValido, state: on })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe(timeoutErrorMsg);
            done();
        })
    })
})

describe('test update route', () => {
    describe('con control app', () => {
        const { spawn } = require('child_process');
        let child;
        beforeAll(() => {
            child = spawn(
                './escucha.py',
                { cwd: config.get('comunication').path, detached: true }
            );
        })
        afterAll(() => {
            process.kill(-child.pid)
        })
        test('update', async done => {
            const res = await request(app).post('/api/control/update')
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body.sections).not.toBeUndefined();
            done();
        })
    })

    describe('sin app de control', () => {
        test('error', async done => {
            const res = await request(app).post('/api/control/update')
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(500);
            expect(res.body.message).toBe(timeoutErrorMsg);
            done();
        })
    })
})