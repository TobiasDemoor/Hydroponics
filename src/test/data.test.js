const request = require('supertest');
const authAux = require('./authAux');
const sections = require('config').data.sections;

let server, app, token;

beforeAll(async () => {
    const res = await authAux();
    server = res.server
    app = res.app
    token = res.token
})

afterAll(() => { server.close() })

test('get recent', async () => {
    for (const [, {id}] of Object.entries(sections)) {
        if (id) {
            const res = await request(app).get(`/api/data/recent/${id}`)
                .set('Cookie', [`token=${token}`])
            expect(res.status).toBe(200);
        }
    }
})
