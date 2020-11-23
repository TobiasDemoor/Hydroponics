const tokenServices = require('./tokenServices');
const { getUser, saveUser } = require('./userRepository');
const { verifySaltHashPassword } = require('./hashServices');
const config = require('config');
const AuthenticationError = require('../errors/AuthenticationError');
const User = require('./User');


/**
 * Verifica login valido, si es correcto retorna id.
 * En caso contrario arroja un error con campo field descriptivo
 * @param {String} username 
 * @param {String} password 
 * @throws {AuthenticationError} 
 * @returns {Number}
 */
async function login(username, password) {
    return getUser()
        .catch(() => {
            const user = new User(config.auth.default, config.auth.default);
            saveUser(user).catch(console.error);
            return user;
        }).then(user => {
            if (user.username !== username) {
                throw new AuthenticationError("username");
            }
            const candidatePassword = verifySaltHashPassword(password, user.salt)
            if (user.password !== candidatePassword) {
                throw new AuthenticationError("password");
            }
            const token = tokenServices.createToken(user)
            return {user, token};
        })
}


/**
 * Guarda un usuario con los datos enviados
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise} 
 */
async function modifyUser(username, password) {
    const user = new User(username, password);
    return saveUser(user);
}

module.exports = { login, modifyUser }