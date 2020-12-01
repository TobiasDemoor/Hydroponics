const request = require('supertest');
const config = require('config');
const User = require('../auth/User');
const { noCookieInRequest, invalidId, parameterMissing } = config.get("strings");
const { createToken } = require('../auth/tokenServices');

const app = require('../server');

const username = "sadfasdfa";
const password = "asdfauierf";

const { columnsOrig, columns, sections, cantRecientes } = config.get("data");
let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element && element !== sections.main.id)
let token;

beforeAll(() => {
    token = createToken(new User(username, password));
})


describe('test recent routes', () => {
    const { recent } = require("../data/dataRepository");

    for (id of ids) {
        test(`get recent seccion = ${id}`, async done => {
            const data = await recent(id, cantRecientes)
            const res = await request(app).get(`/api/data/recent/${id}`)
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(data);
            done();
        })
    }

    for (id of ids) {
        test(`get recent seccion=${id} sin token`, async done => {
            const res = await request(app).get(`/api/data/recent/${id}`);
            expect(res.status).toBe(403);
            expect(res.body.message).toBe(noCookieInRequest);
            done();
        })
    }

    test('get recent con id incorrecto', async done => {
        const id = "invalido";
        const res = await request(app).get(`/api/data/recent/${id}`)
            .set('Cookie', [`token=${token}`]);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe(invalidId);
        expect(res.body.id).toBe(id)
        done();
    })
})

describe('test columns route', () => {
    const { execSync } = require('child_process');
    const { levantaColumns, cambiarColumnas } = require("../data/dataRepository");


    describe('columns todas las secciones valido', () => {

        afterAll(() => {
            execSync(`cp ${columnsOrig(id)} ${columns(id)}`)
        })

        for (id of ids) {
            test(`column id=${id} valido`, async () => {
                const colNew = {
                    a: 1, b: 2, c: {
                        d: ["1", "2", "3"]
                    }
                }
                const res = await request(app).post(`/api/data/columns`)
                    .send({ id, columns: colNew })
                    .set('Cookie', [`token=${token}`]);
                expect(res.status).toBe(200);
                expect(res.body.id).toBe(id);
                return expect(levantaColumns(id)).resolves.toMatchObject(colNew)
            })
        }
    })

    describe('casos limite', () => {
        let id, colOrig;
        const columns = { a: 1, b: 2 };
        beforeAll(async () => {
            id = ids[0];
            return levantaColumns(id).then(col => { colOrig = col });
        })

        test('columns id invalido', async done => {
            const id = "invalido";
            const res = await request(app).post(`/api/data/columns`)
                .send({ id, columns })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(invalidId);
            expect(res.body.id).toBe(id)
            done();
        })

        test('columns sin cookie', async done => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ id, columns: {} })
            expect(res.status).toBe(403);
            expect(res.body.message).toBe(noCookieInRequest);
            expect(levantaColumns(id)).resolves.toMatchObject(colOrig);
            done();
        })

        test('columns con objeto vacio', async done => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ id, columns: {} })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(id);
            expect(await levantaColumns(id)).toMatchObject({})
            await cambiarColumnas(id, colOrig);
            done();
        })

        test('id undefined', async done => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ columns })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(parameterMissing);
            expect(res.body.param).toBe('id')
            done();
        })

        test('columns undefined', async done => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ id })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(parameterMissing);
            expect(res.body.param).toBe('columns')
            await cambiarColumnas(id, colOrig);
            done();
        })
    })

})
