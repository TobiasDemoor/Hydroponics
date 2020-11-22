const checkMinMax = require('./checkMinMax');


it('checks value es NaN', () => {
    expect(checkMinMax("Codigo error", "0.6", "0.8")).toBe(null);
})

it('checks value es number no hay rango', () => {
    expect(checkMinMax("0.9", null, null)).toBe(null);
})

it('checks value es number rango no tiene techo', () => {
    expect(checkMinMax("0.9", "0.5", null)).toBe(true);
    expect(checkMinMax("0.4", "0.7", null)).toBe(false);
})

it('checks value es number rango no tiene piso', () => {
    expect(checkMinMax("0.4", null, "0.7")).toBe(true);
    expect(checkMinMax("0.9", null, "0.5")).toBe(false);
})

it('checks value es number rango completo', () => {
    // adentro
    expect(checkMinMax("0.7", "0.6", "0.8")).toBe(true);
    // se escapa por arriba
    expect(checkMinMax("0.9", "0.6", "0.8")).toBe(false);
    // se escapa por abajo
    expect(checkMinMax("0.4", "0.6", "0.8")).toBe(false);
})

it('checks value es number rango invalido', () => {
    expect(checkMinMax("0.5", "0.6", "0.4")).toBe(false);
})

