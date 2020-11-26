/**
 * Compara el valor de value con min y max. Si value no es un float y/o 
 * min y max no son float retorna null. Si eso no se cumple va a comparar
 * con min y max según si son o no float y retorna booleano segun esta
 * comparación 
 * @param {string} value valor a comparar
 * @param {string} min limite inferior del rango
 * @param {string} max limite superior del rango
 */
function checkMinMax(value, min, max) {
    const v = parseFloat(value)
    const minV = parseFloat(min)
    const maxV = parseFloat(max)
    if (isNaN(v) || (isNaN(minV) && isNaN(maxV))) {
        return null
    } else {
        return (isNaN(minV) || minV < v) && (isNaN(maxV) || v < maxV)
    }
}

module.exports = checkMinMax;