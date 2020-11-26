/**
 * Cierra la sesión del usuario sobreescribiendo la cookie de sesión
 */
function logOut() {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=strict';
}

module.exports = logOut;