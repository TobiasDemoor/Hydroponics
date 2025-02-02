import handleResponse from "./responseService";

async function getRecent(id) {
    return fetch(`/api/data/recent/${id}`).then(handleResponse);
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

async function changeOnOff(id, idActuator, newState) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, idActuator, state: newState }),
    };
    console.debug(requestOptions);
    
    return fetch('/api/control/actuator', requestOptions).then(handleResponse);
}

async function update() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
    };
    console.debug(requestOptions);
    
    return fetch('/api/control/update', requestOptions).then(handleResponse);
}

async function getSections() {
    return fetch('/api/data/sections').then(handleResponse);
}


const services = {
    getRecent,
    submitChanges,
    changeOnOff,
    update,
    getSections
}

export default services;
