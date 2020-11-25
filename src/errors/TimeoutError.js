const { timeoutErrorMsg } = require('config').get('strings');

class TimeoutError extends Error {
    /**
     * Notifica un timeoute de la aplicación de coontrol
     * @param  {...any} params 
     */
    constructor(...params) {
        super(timeoutErrorMsg, ...params);
    }
}

module.exports = TimeoutError;