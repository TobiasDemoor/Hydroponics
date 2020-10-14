const tokenServices = require('../auth/tokenServices');
const { getUser, saveUser } = require('../auth/userRepository');
const { verifySaltHashPassword } = require('../auth/hashServices');
const config = require('config');
const AuthenticationError = require('../errors/AuthenticationError');
const User = require('../models/User');


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

async function modifyUser(username, password) {
    const user = new User(username, password);
    return saveUser(user);
}

module.exports = { login, modifyUser }