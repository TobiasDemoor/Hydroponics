import handleResponse from './responseService'

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };
    console.debug(requestOptions);

    return fetch("/api/auth/login", requestOptions).then(handleResponse);
}

export default {
    login
}