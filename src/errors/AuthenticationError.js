class AuthenticationError extends Error {
    /**
     * Notifica un error en la autenticacion
     * @param {String} field Campo erroneo
     * @param  {...any} params 
     */
    constructor(field = "", ...params) {
        super(...params);
        this.field = field;
    }
}

module.exports = AuthenticationError;