import sectionStatus from './sectionStatus'

describe('sectionStatus con alarm: true', () => {
    const column = {
        id: "test",
        min: 0,
        max: 40,
        alarm: true
    }

    test('valor correcto', () => {
        expect(
            sectionStatus(column, { test: "20" })
        ).toBe(true)
    })

    test('valor incorrecto por abajo', () => {
        expect(
            sectionStatus(column, { test: "-20" })
        ).toBe(false)
    })

    test('valor incorrecto por arriba', () => {
        expect(
            sectionStatus(column, { test: "400" })
        ).toBe(false)
    })

    test('valor NaN', () => {
        expect(
            sectionStatus(column, { test: "EC200" })
        ).toBe(false)
    })
})

describe('sectionStatus con alarm: false', () => {
    const column = {
        id: "test",
        min: 0,
        max: 40,
        alarm: false
    }

    test('valor correcto', () => {
        expect(
            sectionStatus(column, { test: "20" })
        ).toBe(true)
    })

    test('valor incorrecto por abajo', () => {
        expect(
            sectionStatus(column, { test: "-20" })
        ).toBe(true)
    })

    test('valor incorrecto por arriba', () => {
        expect(
            sectionStatus(column, { test: "400" })
        ).toBe(true)
    })

    test('valor NaN', () => {
        expect(
            sectionStatus(column, { test: "EC200" })
        ).toBe(true)
    })
})

describe('sectionStatus No Data', () => {
    const column = {
        id: "test",
        min: 0,
        max: 40,
        alarm: true
    }

    test('row undefined', () => {
        expect(
            sectionStatus(column, undefined)
        ).toBe(false)
    })
})