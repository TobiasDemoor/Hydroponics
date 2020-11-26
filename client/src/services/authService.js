import handleResponse from './responseService'

async function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };
    console.debug(requestOptions);

    return fetch("/api/auth/login", requestOptions).then(handleResponse);
}

async function modifyLogin(currentUsername, currentPassword, newUsername, newPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentUsername, currentPassword, newUsername, newPassword }),
    };
    console.debug(requestOptions);

    return fetch("/api/auth/modify", requestOptions).then(handleResponse);
}

const services = {
    login,
    modifyLogin
}

export default services;