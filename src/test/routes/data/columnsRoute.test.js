const request = require('supertest');
const authAux = require('../authAux');
const config = require('config');
const { levantaColumns, cambiarColumnas } = require("../../../data/dataRepository");
const { sections } = config.get("data");
const { noCookieInRequest, invalidId } = config.get("strings");

let ids = Object.entries(sections).map(([, { id }]) => id);
ids = ids.filter(element => element)
let server, app, token;

beforeAll(async () => {
    const res = await authAux();
    server = res.server;
    app = res.app;
    token = res.token;
})

afterAll(async () => { await server.close(); });

test('columns todas las secciones valido', async () => {
    for (id of ids) {
        const colOrig = await levantaColumns(id);
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
        expect(await levantaColumns(id)).toMatchObject(colNew)
        await cambiarColumnas(id, colOrig);
    }
})

test('columns con objeto vacio', async () => {
    const colOrig = await levantaColumns(id);
    const res = await request(app).post(`/api/data/columns`)
        .send({ id: ids[0], columns: {} })
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ids[0]);
    expect(await levantaColumns(id)).toMatchObject({})
    await cambiarColumnas(ids[0], colOrig);
})

test('columns id invalido', async () => {
    const res = await request(app).post(`/api/data/columns`)
        .send({ id: "invalido", columns: { a: 1, b: 2 } })
        .set('Cookie', [`token=${token}`]);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe(invalidId);
})


