const request = require('supertest');
const config = require('config');
const User = require('../auth/User');
const { noCookieInRequest, invalidId } = config.get("strings");
const { createToken } = require('../auth/tokenServices');

const app = require('../server');

const username = "sadfasdfa";
const password = "asdfauierf";

const { sections, cantRecientes } = config.get("data");
let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element)
let token;

beforeAll(() => {
    token = createToken(new User(username, password));
})


describe('test columns route', () => {
    const { execSync } = require('child_process');
    const { levantaColumns, cambiarColumnas } = require("../data/dataRepository");


    describe('columns todas las secciones valido', () => {

        afterAll(() => {
            for (id of ids) {
                execSync(`cp ./testFiles/logs/${id}.json ./testFiles/logs/${id}.test.json`)
            }
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

        beforeAll(async () => {
            id = ids[0];
            return levantaColumns(id).then(col => { colOrig = col });
        })

        test('columns id invalido', async () => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ id: "invalido", columns: { a: 1, b: 2 } })
                .set('Cookie', [`token=${token}`]);
            expect(res.status).toBe(400);
            expect(res.body.message).toBe(invalidId);
        })

        test('columns sin cookie', async () => {
            const res = await request(app).post(`/api/data/columns`)
                .send({ id, columns: {} })
            expect(res.status).toBe(403);
            expect(res.body.message).toBe(noCookieInRequest);
            expect(levantaColumns(id)).resolves.toMatchObject(colOrig);
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
    })

})

describe('test recent routes', () => {
    const { recent } = require("../data/dataRepository");

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
})
