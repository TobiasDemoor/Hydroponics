import handleResponse from "./responseService";

async function getRecent(id) {
    const requestOptions = {
        method: 'GET'
    };
    console.debug(requestOptions);

    return fetch(`/api/data/recent/${id}`, requestOptions).then(handleResponse);
}

async function changeOnOff(id, newState) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, newState }),
    };
    console.debug(requestOptions);

    return fetch('/api/control', requestOptions).then(handleResponse);
}

async function submitChanges(columns, id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns, id }),
    };
    console.debug(requestOptions);

    return fetch('/api/data/columns', requestOptions).then(handleResponse);
}

export default {
    getRecent,
    changeOnOff,
    submitChanges
}