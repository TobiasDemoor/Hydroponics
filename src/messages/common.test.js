const { control } = require('./common.js')
const { exec } = require('child_process');
const { path } = require('config').get('comunication');

const script = `cd ${path} && python3 common.test.py`;
const file = "test";

test('retorna correcto', async () => {
    exec(script, err => { if (err) throw err });
    return expect(control("ok", file)).resolves.toBe();
})

test('retorna mensaje de error', async () => {
    exec(script, err => { if (err) throw err });
    return expect(control("error", file)).rejects.toThrow('test error');
})

test('no hay respuesta', async () => {
    return expect(control("", "inexistente")).rejects.toThrow();
})