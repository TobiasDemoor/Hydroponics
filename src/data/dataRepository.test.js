const {
    levantaRecientes
} = require('./dataRepository');

test('request de muchos datos', async () => {
    return expect(levantaRecientes('ambient', 500)).resolves.not.toBeNull();
})