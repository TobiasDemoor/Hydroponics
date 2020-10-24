import handleResponse from "./responseService";

async function getRecent(id) {
    const requestOptions = {
        method: 'GET'
    };
    console.debug(requestOptions);

    return fetch(`/api/data/recent/${id}`, requestOptions).then(handleResponse);
}

async function submitChanges(columns, id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ columns, id }),
    };
    console.debug(requestOptions);

    // return fetch('/api/data/changes', requestOptions).then(handleResponse)
    return {}
}

export default {
    getRecent,
    submitChanges
}