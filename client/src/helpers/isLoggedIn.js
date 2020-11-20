/**
 * @returns (boolean) is the user logged in
 */
function isLoggedIn() {
    return document.cookie.includes("token=");;
}

module.exports = isLoggedIn;