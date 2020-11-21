class IdError extends Error {
    /**
     * Notifica un id invalido
     * @param {String} id id invalido
     * @param  {...any} params 
     */
    constructor(id = "", ...params) {
        super(...params);
        this.id = id;
    }
}

module.exports = IdError;