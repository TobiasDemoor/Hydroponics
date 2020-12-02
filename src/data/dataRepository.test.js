const fs = require('fs');
const config = require('config');
const {
    levantaRecientes
} = require('./dataRepository');

const { log, sections } = config.get('data');
const { id } = sections.ambient;

test('request de muchos datos', async () => {
    return expect(levantaRecientes(id, 500)).resolves.not.toBeNull();
})

describe('tests sin .0', () => {
    const route = log(id);

    beforeAll(() => {
        fs.renameSync(route + '.0', route + '.0.no')
    })

    afterAll(() => {
        fs.renameSync(route + '.0.no', route + '.0')
    })

    test('request de muchos datos sin .0', async () => {
        return expect(levantaRecientes(id, 500)).resolves.not.toBeNull();
    })

    describe('tests sin .log', () => {
        beforeAll(() => {
            fs.renameSync(route, route + '.no')
        })

        afterAll(() => {
            fs.renameSync(route + '.no', route)
        })

        test('request de muchos datos sin log', async () => {
            return expect(levantaRecientes(id, 500)).resolves.toEqual([]);
        })
    })
})